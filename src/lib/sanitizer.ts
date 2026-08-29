import sanitizeHtml from "sanitize-html";

export type SanitizeMode = "strict" | "standard" | "permissive" | "custom";

export interface SanitizeOptions {
  mode?: SanitizeMode;
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  allowDataAttributes?: boolean;
}

export interface SanitizeStats {
  original_length: number;
  sanitized_length: number;
  tags_removed: number;
  attributes_removed: number;
}

const STRICT_TAGS = [
  "p", "a", "b", "i", "em", "strong", "ul", "ol", "li", "br",
  "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code", "pre",
];

const STANDARD_TAGS = [
  ...STRICT_TAGS,
  "img", "table", "thead", "tbody", "tr", "th", "td",
  "span", "div", "hr", "sub", "sup", "dl", "dt", "dd",
];

const PERMISSIVE_TAGS = [
  ...STANDARD_TAGS,
  "video", "audio", "source", "picture", "figure", "figcaption",
  "article", "section", "header", "footer", "nav", "aside", "main",
  "details", "summary", "mark", "small", "time", "abbr", "cite",
  "iframe",
];

const GLOBAL_ATTRS = ["class", "id", "style", "title", "dir", "lang"];
const LINK_ATTRS = ["href", "title", "target", "rel"];
const IMG_ATTRS = ["src", "alt", "width", "height", "loading"];
const TABLE_ATTRS = ["colspan", "rowspan", "scope"];

const MODE_PRESETS: Record<Exclude<SanitizeMode, "custom">, sanitizeHtml.IOptions> = {
  strict: {
    allowedTags: STRICT_TAGS,
    allowedAttributes: {
      a: LINK_ATTRS,
      "*": [],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
  },
  standard: {
    allowedTags: STANDARD_TAGS,
    allowedAttributes: {
      a: LINK_ATTRS,
      img: IMG_ATTRS,
      td: TABLE_ATTRS,
      th: TABLE_ATTRS,
      "*": GLOBAL_ATTRS,
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
  },
  permissive: {
    allowedTags: PERMISSIVE_TAGS,
    allowedAttributes: {
      a: LINK_ATTRS,
      img: IMG_ATTRS,
      td: TABLE_ATTRS,
      th: TABLE_ATTRS,
      video: ["src", "controls", "width", "height", "poster"],
      audio: ["src", "controls"],
      source: ["src", "type"],
      iframe: ["src", "width", "height", "allowfullscreen", "loading"],
      "*": GLOBAL_ATTRS,
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com", "vimeo.com"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
  },
};

function countTags(html: string): number {
  const matches = html.match(/<[a-zA-Z][^>]*>/g);
  return matches ? matches.length : 0;
}

function countAttributes(html: string): number {
  const tagMatches = html.match(/<[a-zA-Z][^>]*>/g) || [];
  let total = 0;
  for (const tag of tagMatches) {
    // Skip closing tags
    if (tag.startsWith("</")) continue;
    // Count attributes: key=value or key
    const attrMatches = tag.match(/[a-zA-Z_:][a-zA-Z0-9_.:-]*(?=\s*=|\s|>)/g);
    if (attrMatches) {
      // Filter out tag name itself (first match)
      total += attrMatches.length > 1 ? attrMatches.length - 1 : 0;
    }
  }
  return total;
}

export function sanitize(
  html: string,
  options: SanitizeOptions = {}
): { sanitized: string; stats: SanitizeStats; mode: SanitizeMode } {
  const mode: SanitizeMode = options.mode || "standard";

  const originalTags = countTags(html);
  const originalAttrs = countAttributes(html);

  let sanitizeOptions: sanitizeHtml.IOptions;

  if (mode === "custom") {
    const customAllowedAttributes: Record<string, string[]> =
      options.allowedAttributes || {
        a: LINK_ATTRS,
        "*": GLOBAL_ATTRS,
      };
    // sanitize-html has no `allowDataAttributes` option; data-* attributes are
    // allowed via glob patterns in allowedAttributes (e.g. { "*": ["data-*"] }).
    if (options.allowDataAttributes) {
      customAllowedAttributes["*"] = [
        ...(customAllowedAttributes["*"] || []),
        "data-*",
      ];
    }
    sanitizeOptions = {
      allowedTags: options.allowedTags || STANDARD_TAGS,
      allowedAttributes: customAllowedAttributes,
      allowedSchemes: ["http", "https", "mailto"],
      allowProtocolRelative: false,
      disallowedTagsMode: "discard",
    };
  } else {
    sanitizeOptions = { ...MODE_PRESETS[mode] };
    if (options.allowDataAttributes) {
      // Add data-* glob to the global attribute allowlist.
      sanitizeOptions.allowedAttributes = {
        ...sanitizeOptions.allowedAttributes,
        "*": [...(sanitizeOptions.allowedAttributes?.["*"] || []), "data-*"],
      };
    }
  }

  const sanitized = sanitizeHtml(html, sanitizeOptions);

  const sanitizedTags = countTags(sanitized);
  const sanitizedAttrs = countAttributes(sanitized);

  return {
    sanitized,
    stats: {
      original_length: html.length,
      sanitized_length: sanitized.length,
      tags_removed: Math.max(0, originalTags - sanitizedTags),
      attributes_removed: Math.max(0, originalAttrs - sanitizedAttrs),
    },
    mode,
  };
}

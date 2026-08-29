import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://htmlshield.vercel.app";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HTMLShield - HTML Sanitizer API",
  description:
    "Secure HTML sanitization API. Remove XSS, malicious scripts, and dangerous tags from any HTML. Free tier available.",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web-based",
  browserRequirements: "Requires a modern web browser",
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      description: "3 sanitization requests per day per IP. No API key required.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "Offer",
      name: "Starter",
      description: "Starter plan for individual developers, billed monthly.",
      price: "3",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "Offer",
      name: "Pro",
      description: "Pro plan for growing teams, billed monthly.",
      price: "9",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    },
    {
      "@type": "Offer",
      name: "Business",
      description: "Business plan with high request limits, billed monthly.",
      price: "25",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#pricing`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HTMLShield — HTML Sanitizer & XSS Protection API",
    template: "%s | HTMLShield",
  },
  description:
    "Sanitize HTML and eliminate XSS threats with a single API call. Remove malicious scripts, dangerous tags, and harmful attributes. Pure rules, zero data retention.",
  keywords: [
    "HTML sanitizer API",
    "XSS protection",
    "HTML sanitization",
    "security API",
    "sanitize HTML",
    "prevent XSS",
    "content security",
  ],
  openGraph: {
    title: "HTMLShield — HTML Sanitizer & XSS Protection API",
    description:
      "Sanitize HTML and eliminate XSS threats with a single API call. Pure rules, zero data retention.",
    type: "website",
    url: SITE_URL,
    siteName: "HTMLShield",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HTMLShield — HTML Sanitizer API. Stop XSS in one call.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HTMLShield — HTML Sanitizer & XSS Protection API",
    description: "Sanitize HTML and eliminate XSS threats with a single API call.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

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

export const metadata: Metadata = {
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
    url: "https://htmlshield.vercel.app",
    siteName: "HTMLShield",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTMLShield — HTML Sanitizer & XSS Protection API",
    description: "Sanitize HTML and eliminate XSS threats with a single API call.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://hunterapplications.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jay Hunter — Software Engineer · Agentic Development",
    template: "%s · Jay Hunter",
  },
  description:
    "I architect and ship production software systems solo, using agentic AI development. Portfolio of AI, ML, and full-stack platforms.",
  keywords: [
    "software engineer",
    "agentic development",
    "AI engineer",
    "machine learning",
    ".NET",
    "Next.js",
    "full-stack",
  ],
  authors: [{ name: "Jay Hunter" }],
  openGraph: {
    title: "Jay Hunter — Software Engineer · Agentic Development",
    description:
      "Portfolio of production AI, ML, and full-stack systems architected and shipped solo with agentic development.",
    url: siteUrl,
    siteName: "Hunter Applications",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Hunter — Software Engineer",
    description:
      "Production AI, ML, and full-stack systems built solo with agentic development.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

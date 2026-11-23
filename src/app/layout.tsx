import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfDisplay = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/sf-pro-display_regular.woff2", weight: "400" },
    { path: "./fonts/sf-pro-display_semibold.woff2", weight: "600" },
    { path: "./fonts/sf-pro-display_bold.woff2", weight: "700" },
  ],
});

const sfText = localFont({
  variable: "--font-text",
  display: "swap",
  src: [
    { path: "./fonts/sf-pro-text_regular.woff2", weight: "400" },
    { path: "./fonts/sf-pro-text_semibold.woff2", weight: "600" },
  ],
});

export const metadata: Metadata = {
  title: "Scott Galetto, AI-fluent design technologist",
  description:
    "Scott Galetto helps teams figure out what to build, then brings it to life through design, prototyping, and AI.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#FAFAF8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sfDisplay.variable} ${sfText.variable}`}>
      <body>{children}</body>
    </html>
  );
}

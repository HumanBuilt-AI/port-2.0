import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The woff2 files are subset to Latin, punctuation, arrows and the few symbols the site uses (about 45 KB
// each instead of 115-230 KB); hinting and all OpenType features are kept. To redo it from the full fonts:
// pyftsubset IN.woff2 --unicodes="U+0000-017F,U+0192,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0308,U+2000-206F,U+20AC,U+2122,U+2190-21FF,U+2212,U+2215,U+2248,U+2260-2265,U+2500,U+25A0-25CF,U+2605,U+2713,U+2922" --layout-features='*' --name-IDs='*' --notdef-outline --flavor=woff2 --output-file=OUT.woff2
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
  // the design is light only: ask dark-mode extensions (Dark Reader and others that read these) to leave it alone
  other: { "darkreader-lock": "true" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#FAFAF8",
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sfDisplay.variable} ${sfText.variable}`}>
      <body>{children}</body>
    </html>
  );
}

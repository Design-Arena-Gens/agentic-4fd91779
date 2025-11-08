import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-base",
});

export const metadata: Metadata = {
  title: "EditLab Neon Pulse — Insta Profile Picture Generator",
  description:
    "Download a futuristic, neon-charged profile picture designed for editing pages. Crafted for instant Instagram impact.",
  openGraph: {
    title: "EditLab Neon Pulse — Insta Profile Picture Generator",
    description:
      "Download a futuristic, neon-charged profile picture designed for editing pages. Crafted for instant Instagram impact.",
    url: "https://agentic-4fd91779.vercel.app",
    siteName: "EditLab Neon Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "EditLab Neon Pulse — Insta Profile Picture Generator",
    description:
      "Drop a neon identity on your editing Insta page with this ready-to-use profile badge.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

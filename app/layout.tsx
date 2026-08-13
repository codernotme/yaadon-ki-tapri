import type { Metadata } from "next";
import { Yatra_One, Sniglet, Space_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

const yatraOne = Yatra_One({
  weight: "400",
  variable: "--font-yatra",
  subsets: ["devanagari", "latin"],
});

const sniglet = Sniglet({
  weight: "400",
  variable: "--font-sniglet",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "यादों की टपरी | Yaadon Ki Tapri — 90s-2000s Retro Radio",
  description: "the songs playing at every nukkad, every evening. A nostalgic 90s-2000s Indian pop culture radio player by codernotme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      suppressHydrationWarning
      className={`${yatraOne.variable} ${sniglet.variable} ${spaceMono.variable} h-full antialiased font-sans text-brand-black bg-brand-cream`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}

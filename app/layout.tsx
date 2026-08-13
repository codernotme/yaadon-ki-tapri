import type { Metadata } from "next";
import { Sniglet, Space_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

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
  title: "Nukkad Radio",
  description: "the songs playing at every nukkad, every evening.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sniglet.variable} ${spaceMono.variable} h-full antialiased font-sans text-brand-black bg-brand-cream`}
    >
      <body className="min-h-full flex flex-col noise-bg">
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}

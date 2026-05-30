import type { Metadata } from "next";
import { Space_Grotesk, Oswald } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "MALIBU — Streetwear",
  description: "Born on the coast. Made for the streets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${spaceGrotesk.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full bg-background text-text-main antialiased">
        {children}
      </body>
    </html>
  );
}

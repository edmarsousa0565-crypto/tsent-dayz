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
  title: "TSENT SYDAZ",
  description: "Bop House. Rap. Trap. R&B. O som que define a rua.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${spaceGrotesk.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-text-main">
        {children}
      </body>
    </html>
  );
}

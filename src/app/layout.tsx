import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Krisnanda — Digital Marketing & IT Specialist",
  description:
    "Portfolio of Krisnanda — A Digital Marketing Professional & IT Specialist bridging the gap between digital innovation and strategic marketing.",
  keywords: [
    "Digital Marketing",
    "IT Specialist",
    "Content Creator",
    "Web Developer",
    "Portfolio",
    "Bali",
  ],
};

import CursorTrail from "@/components/CursorTrail";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CursorTrail />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

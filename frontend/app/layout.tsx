import React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ChainFund - Decentralized Crowdfunding Platform",
  description: "Fund the future with blockchain-powered crowdfunding. Transparent, secure, and community-driven.",
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

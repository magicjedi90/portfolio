import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jesse McIntosh Portfolio",
  description: "Professional portfolio showcasing experience and projects",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '192x192' },
      { url: '/favicon.ico', sizes: '512x512' }
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/favicon.ico' }],
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        rel: 'mask-icon',
        url: '/favicon.ico',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

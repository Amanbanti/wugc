'use client';

import React from "react"

import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cinzel } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], weights: [400, 600, 700] });
const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], weights: [400, 600] });

export const metadata: Metadata = {
  title: 'Wolkite University - Graduating Class Showcase',
  description: 'Premium graduation showcase celebrating Wolkite University graduating class students',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <style jsx global>{`
          :root {
            --font-playfair: ${playfair.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
            --font-cinzel: ${cinzel.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}

import React from "react"

import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cinzel } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
});


export const metadata: Metadata = {
  title: 'Wolkite University - Graduating Class Showcase',
  description:
    'Premium graduation showcase celebrating Wolkite University graduating class students',
  icons: {
    icon: [
      {
        url: '/graduation-cap-circular-button-svgrepo-com.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: {
      url: '/apple-icon.png',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cinzel.variable} dark`}>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}

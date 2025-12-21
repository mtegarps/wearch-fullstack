import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wearch",
  description: "Wearch Studio",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Wearch',
    description: 'Wearch Studio',
    url: 'https://wearch.id',
    siteName: 'Wearch',
    images: [
      {
        url: 'https://wearch.id/favicon.ico',
        width: 512,
        height: 512,
        alt: 'Wearch Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Wearch',
    description: 'Wearch Studio',
    images: ['https://wearch.id/favicon.ico'],
  },
  metadataBase: new URL('https://wearch.id'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
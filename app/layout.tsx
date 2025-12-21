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
        url: 'https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png',
        width: 885,
        height: 677,
        alt: 'Wearch Studio',
      }
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wearch',
    description: 'Wearch Studio',
    images: ['https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png'],
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
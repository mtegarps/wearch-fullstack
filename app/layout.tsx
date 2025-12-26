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
  metadataBase: new URL('https://wearch.id'),
  
  // Basic Meta Tags
  title: {
    default: "wearch - Jasa Arsitek Bandung, Bogor & Jabodetabek Terpercaya",
    template: "%s | wearch Arsitek"
  },
  description: "wearch adalah jasa arsitek profesional di Bandung, Bogor, dan Jabodetabek. Kami menyediakan layanan desain rumah, renovasi, interior design, dan perencanaan bangunan dengan hasil maksimal dan harga terjangkau.",
  keywords: [
    "wearch",
    "wearch studio",
    "wearch.id",
    "jasa arsitek bandung",
    "arsitek bogor",
    "jasa arsitek jabodetabek",
    "desain rumah bandung",
    "arsitek profesional",
    "jasa desain rumah",
    "renovasi rumah bandung",
    "interior design",
    "gambar arsitek",
    "rab bangunan",
    "desain rumah minimalis",
    "kontraktor bandung"
  ],
  authors: [{ name: "wearch Studio", url: "https://wearch.id" }],
  creator: "wearch Studio",
  publisher: "wearch Studio",
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  
  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://wearch.id',
    siteName: 'wearch',
    title: 'wearch - Jasa Arsitek Bandung, Bogor & Jabodetabek',
    description: 'Jasa arsitek profesional di Bandung, Bogor, dan Jabodetabek. Desain rumah, renovasi, interior design dengan hasil berkualitas dan harga terjangkau.',
    images: [
      {
        url: 'https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png',
        width: 885,
        height: 677,
        alt: 'wearch - Jasa Arsitek',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@wearch',
    creator: '@wearch',
    title: 'wearch - Jasa Arsitek Bandung, Bogor & Jabodetabek',
    description: 'Jasa arsitek profesional di Bandung, Bogor, dan Jabodetabek. Desain rumah, renovasi, interior design dengan hasil berkualitas dan harga terjangkau.',
    images: ['https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png'],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification (update nanti setelah daftar Google Search Console)
  verification: {
    google: 'YP0Z9oaWwz6EHGuEwUgr49FSTxd_gc2qyBZcL-nD3bs',
  },
  
  // Additional Meta Tags
  category: 'Architecture',
  classification: 'Business',
  
  // Alternate Languages
  alternates: {
    canonical: 'https://wearch.id',
    languages: {
      'id-ID': 'https://wearch.id',
    },
  },
  
  // Other Meta Tags
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'wearch',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Google Site Verification - TAMBAHAN BARU */}
        <meta name="google-site-verification" content="YP0Z9oaWwz6EHGuEwUgr49FSTxd_gc2qyBZcL-nD3bs" />
        
        {/* JSON-LD Schema for Rich Results - LOCAL BUSINESS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "wearch",
              "alternateName": "wearch Studio",
              "url": "https://wearch.id",
              "logo": "https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png",
              "description": "Jasa arsitek profesional di Bandung, Bogor, dan Jabodetabek",
              "priceRange": "$$",
              "telephone": "+6281802222716",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID",
                "addressRegion": "Jawa Barat",
                "addressLocality": "Bandung",
                // "streetAddress": "Jl. Contoh No. 123", // Ganti dengan alamat asli
                // "postalCode": "40xxx" // Ganti dengan kode pos
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Bandung"
                },
                {
                  "@type": "City",
                  "name": "Bogor"
                },
                {
                  "@type": "City",
                  "name": "Jakarta"
                },
                {
                  "@type": "City",
                  "name": "Depok"
                },
                {
                  "@type": "City",
                  "name": "Tangerang"
                },
                {
                  "@type": "City",
                  "name": "Bekasi"
                }
              ],
              "serviceType": [
                "Jasa Arsitek",
                "Desain Rumah",
                "Renovasi Rumah",
                "Interior Design",
                "Konsultan Bangunan",
                "Perencanaan Arsitektur"
              ],
              "sameAs": [
                "https://www.instagram.com/wearch_studio", 
                // "https://www.facebook.com/wearch",
                // "https://www.linkedin.com/company/wearch"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
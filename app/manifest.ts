import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'wearch - Jasa Arsitek Bandung & Bogor',
    short_name: 'wearch',
    description: 'Jasa arsitek profesional di Bandung, Bogor, dan Jabodetabek',
    start_url: '/',
    display: 'standalone',
    background_color: '#242222',
    theme_color: '#00ff00',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '256x256',
        type: 'image/x-icon',
      },
      {
        src: 'https://res.cloudinary.com/dncwjb46j/image/upload/v1766319066/Logo_txeq7u.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
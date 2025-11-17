import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Foreningen ROBUST',
    short_name: 'ROBUST',
    description: 'En kunnskapskollektiv om degrowth og post-kapitalistiske fremtider',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#e3160b',
    icons: [
      {
        src: '/icon-192.jpg',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.jpg',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

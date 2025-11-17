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
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

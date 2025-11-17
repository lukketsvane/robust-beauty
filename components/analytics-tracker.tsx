'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        })
      } catch (error) {
        console.error('Failed to track page view:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get article counts
    const { data: articles } = await supabase
      .from('articles')
      .select('id, title, slug, published, created_at')

    const totalArticles = articles?.length || 0
    const publishedArticles = articles?.filter(a => a.published).length || 0

    // Get total page views from site_analytics
    const { data: allAnalytics } = await supabase
      .from('site_analytics')
      .select('page_views, unique_visitors')

    const totalPageViews = allAnalytics?.reduce((sum, row) => sum + (row.page_views || 0), 0) || 0
    const totalUniqueVisitors = allAnalytics?.reduce((sum, row) => sum + (row.unique_visitors || 0), 0) || 0

    // Get today's views
    const today = new Date().toISOString().split('T')[0]
    const { data: todayAnalytics } = await supabase
      .from('site_analytics')
      .select('page_views')
      .eq('date', today)

    const viewsToday = todayAnalytics?.reduce((sum, row) => sum + (row.page_views || 0), 0) || 0

    // Get this week's views (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekAgoStr = weekAgo.toISOString().split('T')[0]

    const { data: weekAnalytics } = await supabase
      .from('site_analytics')
      .select('page_views')
      .gte('date', weekAgoStr)

    const viewsThisWeek = weekAnalytics?.reduce((sum, row) => sum + (row.page_views || 0), 0) || 0

    // Get top articles by view count
    const { data: articleViews } = await supabase
      .from('article_views')
      .select('article_slug')

    // Count views per article
    const viewCounts: Record<string, number> = {}
    articleViews?.forEach(view => {
      viewCounts[view.article_slug] = (viewCounts[view.article_slug] || 0) + 1
    })

    // Match with article titles and create top articles list
    const topArticles = Object.entries(viewCounts)
      .map(([slug, views]) => {
        const article = articles?.find(a => a.slug === slug)
        return article ? {
          title: article.title,
          slug: article.slug,
          views,
        } : null
      })
      .filter(Boolean)
      .sort((a, b) => (b?.views || 0) - (a?.views || 0))
      .slice(0, 5) as Array<{ title: string; slug: string; views: number }>

    return NextResponse.json({
      pageViews: totalPageViews,
      uniqueVisitors: totalUniqueVisitors,
      totalArticles,
      publishedArticles,
      viewsToday,
      viewsThisWeek,
      topArticles,
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

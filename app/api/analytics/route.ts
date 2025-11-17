import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get article counts
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('id, title, slug, published, created_at');

    if (articlesError) {
      console.error('[v0] Error fetching articles:', articlesError);
    }

    // Get or create analytics data from a table
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('site_analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(7);

    if (analyticsError && analyticsError.code !== 'PGRST116') {
      console.error('[v0] Error fetching analytics:', analyticsError);
    }

    // Calculate mock data (in production, this would come from actual tracking)
    const totalArticles = articles?.length || 0;
    const publishedArticles = articles?.filter(a => a.published).length || 0;
    
    // Mock analytics data (replace with real data from analytics table)
    const mockPageViews = Math.floor(Math.random() * 5000) + 1000;
    const mockUniqueVisitors = Math.floor(mockPageViews * 0.6);
    const mockViewsToday = Math.floor(Math.random() * 200) + 50;
    const mockViewsThisWeek = Math.floor(Math.random() * 1000) + 300;

    // Generate top articles with mock data
    const topArticles = articles
      ?.filter(a => a.published)
      .slice(0, 5)
      .map(article => ({
        title: article.title,
        slug: article.slug,
        views: Math.floor(Math.random() * 500) + 50,
      }))
      .sort((a, b) => b.views - a.views) || [];

    return NextResponse.json({
      pageViews: mockPageViews,
      uniqueVisitors: mockUniqueVisitors,
      totalArticles,
      publishedArticles,
      viewsToday: mockViewsToday,
      viewsThisWeek: mockViewsThisWeek,
      topArticles,
    });
  } catch (error) {
    console.error('[v0] Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

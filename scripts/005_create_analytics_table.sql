-- Create site_analytics table for tracking page views and visitor data
CREATE TABLE IF NOT EXISTS site_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  page_path TEXT NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date);
CREATE INDEX IF NOT EXISTS idx_site_analytics_page_path ON site_analytics(page_path);

-- Create article_views table for tracking individual article views
CREATE TABLE IF NOT EXISTS article_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT
);

-- Create index for article views
CREATE INDEX IF NOT EXISTS idx_article_views_slug ON article_views(article_slug);
CREATE INDEX IF NOT EXISTS idx_article_views_date ON article_views(viewed_at);

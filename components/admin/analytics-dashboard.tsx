"use client";

import { useEffect, useState } from "react";
import { BarChart3, Eye, FileText, TrendingUp, Calendar } from 'lucide-react';

type AnalyticsData = {
  pageViews: number;
  uniqueVisitors: number;
  totalArticles: number;
  publishedArticles: number;
  viewsToday: number;
  viewsThisWeek: number;
  topArticles: Array<{ title: string; views: number; slug: string }>;
};

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    totalArticles: 0,
    publishedArticles: 0,
    viewsToday: 0,
    viewsThisWeek: 0,
    topArticles: [],
  });

  useEffect(() => {
    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Statistikk</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border p-4">
          <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
            <Eye className="h-3 w-3" />
            <span>Sidevisninger</span>
          </div>
          <div className="text-2xl font-bold">{analytics.pageViews.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Totalt</div>
        </div>

        <div className="bg-white border p-4">
          <div className="flex items-center gap-2 text-green-600 text-xs mb-1">
            <TrendingUp className="h-3 w-3" />
            <span>Unike besøkende</span>
          </div>
          <div className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Totalt</div>
        </div>

        <div className="bg-white border p-4">
          <div className="flex items-center gap-2 text-purple-600 text-xs mb-1">
            <Calendar className="h-3 w-3" />
            <span>I dag</span>
          </div>
          <div className="text-2xl font-bold">{analytics.viewsToday.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Visninger</div>
        </div>

        <div className="bg-white border p-4">
          <div className="flex items-center gap-2 text-orange-600 text-xs mb-1">
            <BarChart3 className="h-3 w-3" />
            <span>Denne uken</span>
          </div>
          <div className="text-2xl font-bold">{analytics.viewsThisWeek.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Visninger</div>
        </div>
      </div>

      {analytics.topArticles.length > 0 && (
        <div className="bg-white border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Mest populære artikler
            </h3>
          </div>
          <div className="divide-y">
            {analytics.topArticles.slice(0, 5).map((article, idx) => (
              <div key={idx} className="p-3 flex justify-between items-center hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{article.title}</div>
                  <div className="text-xs text-gray-500 truncate">/{article.slug}</div>
                </div>
                <div className="text-sm font-semibold text-gray-700 ml-4 flex-shrink-0">
                  {article.views.toLocaleString()} visninger
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

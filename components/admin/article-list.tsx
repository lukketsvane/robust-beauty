"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { nb } from "date-fns/locale";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export function ArticleList({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
  }

  async function deleteArticle(id: string) {
    if (!confirm("Er du sikker på at du vil slette denne artikkelen?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) {
      console.error("Error deleting article:", error);
      alert("Kunne ikke slette artikkel");
    } else {
      loadArticles();
    }
  }

  const filteredArticles = articles.filter(article => {
    if (filter === "all") return true;
    return article.category === filter;
  });

  const getCategoryLabel = (category: string | null) => {
    const labels: Record<string, string> = {
      "om-oss": "Om oss",
      "prosjekter": "Prosjekter",
      "i-media": "I media",
      "kontakt": "Kontakt"
    };
    return category ? labels[category] || category : "Ingen kategori";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-[#e3160b] hover:bg-[#c51309]" : ""}
        >
          Alle
        </Button>
        <Button
          size="sm"
          variant={filter === "om-oss" ? "default" : "outline"}
          onClick={() => setFilter("om-oss")}
          className={filter === "om-oss" ? "bg-[#e3160b] hover:bg-[#c51309]" : ""}
        >
          Om oss
        </Button>
        <Button
          size="sm"
          variant={filter === "prosjekter" ? "default" : "outline"}
          onClick={() => setFilter("prosjekter")}
          className={filter === "prosjekter" ? "bg-[#e3160b] hover:bg-[#c51309]" : ""}
        >
          Prosjekter
        </Button>
        <Button
          size="sm"
          variant={filter === "i-media" ? "default" : "outline"}
          onClick={() => setFilter("i-media")}
          className={filter === "i-media" ? "bg-[#e3160b] hover:bg-[#c51309]" : ""}
        >
          I media
        </Button>
        <Button
          size="sm"
          variant={filter === "kontakt" ? "default" : "outline"}
          onClick={() => setFilter("kontakt")}
          className={filter === "kontakt" ? "bg-[#e3160b] hover:bg-[#c51309]" : ""}
        >
          Kontakt
        </Button>
      </div>

      {filteredArticles.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            {filter === "all" 
              ? "Ingen artikler ennå. Opprett din første artikkel!" 
              : `Ingen artikler i kategorien "${getCategoryLabel(filter)}".`}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </div>
                    <div className="flex gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(article.category)}
                      </Badge>
                      <Badge variant={article.published ? "default" : "secondary"} className={article.published ? "bg-[#e3160b]" : ""}>
                        {article.published ? "Publisert" : "Utkast"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Sist oppdatert {formatDistanceToNow(new Date(article.updated_at), { addSuffix: true, locale: nb })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {article.excerpt && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                )}
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/articles/${article.id}/edit`}>Rediger</Link>
                  </Button>
                  {article.published && (
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/artikkel/${article.slug}`} target="_blank">Forhåndsvis</Link>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteArticle(article.id)}
                  >
                    Slett
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

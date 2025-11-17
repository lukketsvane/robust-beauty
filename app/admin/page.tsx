import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArticleList } from "@/components/admin/article-list";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');
  
  if (!adminSession) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#e3160b]">ROBUST</h1>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/">Se nettside</Link>
            </Button>
            <form action="/admin/logout" method="post">
              <Button variant="outline" type="submit">
                Logg ut
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Artikler</h2>
          <Button asChild className="bg-[#e3160b] hover:bg-[#c51309]">
            <Link href="/admin/articles/new">Ny artikkel</Link>
          </Button>
        </div>
        <ArticleList initialArticles={articles || []} />
      </main>
    </div>
  );
}

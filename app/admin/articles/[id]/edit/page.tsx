import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { createClient } from "@/lib/supabase/server";
import { ArticleEditor } from "@/components/admin/article-editor";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');
  
  if (!adminSession) {
    redirect("/admin/login");
  }

  const supabase = await createClient();
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-[#e3160b]">Rediger artikkel</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleEditor article={article} />
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default async function OmOssPage() {
  const supabase = await createClient();
  
  const { data: sections } = await supabase
    .from("content_sections")
    .select("*")
    .eq("page_name", "om-oss")
    .eq("published", true)
    .order("order_index", { ascending: true });

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("category", "om-oss")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#ffc2c2]">
      {/* Header */}
      <header className="bg-[#e3160b] py-6 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-white hover:text-[#ffc2c2] transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="font-['JetBrains_Mono',monospace] text-lg">Tilbake</span>
          </Link>
          <h1 className="font-['JetBrains_Mono',monospace] font-bold text-white text-2xl">
            Om oss
          </h1>
          <div className="w-12 h-12">
            <Image
              src="/robust-logo.png"
              alt="ROBUST Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        
        {sections && sections.map((section) => (
          <section key={section.id} className="mb-16">
            {section.title && (
              <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-6">
                {section.title}
              </h2>
            )}
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
              <div className="prose prose-lg max-w-none font-['JetBrains_Mono',monospace] text-[#000000]">
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
            </div>
          </section>
        ))}

        {/* Articles from CMS */}
        {articles && articles.length > 0 && (
          <section className="mb-16">
            <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-6">
              Relaterte artikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/artikkel/${article.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {article.featured_image_url && (
                    <div className="aspect-video relative">
                      <Image
                        src={article.featured_image_url || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-xl font-bold mb-3">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="font-['JetBrains_Mono',monospace] text-gray-700 text-sm line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) {
    notFound();
  }

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
      <article className="max-w-[900px] mx-auto px-6 py-12">
        <div className="bg-white overflow-hidden shadow-sm">
          {article.featured_image_url && (
            <div className="aspect-video relative">
              <Image
                src={article.featured_image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-6">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="font-['JetBrains_Mono',monospace] text-gray-600 text-lg mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}
            
            <div className="font-['JetBrains_Mono',monospace] text-gray-800 prose prose-lg max-w-none">
              <ReactMarkdown>{article.content || ""}</ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="font-['JetBrains_Mono',monospace] text-gray-500 text-sm">
                Publisert: {new Date(article.created_at).toLocaleDateString('no-NO', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

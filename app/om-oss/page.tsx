import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default async function OmOssPage() {
  const supabase = await createClient();
  
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
        <div className="prose prose-lg max-w-none">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-8 text-left">
              Vi er et kunnskapskollektiv som jobber for å spre kunnskap om et postvekst samfunn.
            </h2>
            <p className="font-['JetBrains_Mono',monospace] text-[#000000] text-lg leading-relaxed mb-6 text-left">
              For å utvikle samfunnet til en post-kapitalistisk fremtid må vi holde minst to tanker i hodet samtidig.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-xl font-bold mb-4">
                Våre tre retningsstyrere:
              </h3>
              <ul className="space-y-4 font-['JetBrains_Mono',monospace] text-[#000000] text-lg">
                <li className="flex gap-3">
                  <span className="text-[#e3160b] font-bold">•</span>
                  <span>Å forankre arbeidet akademisk og teoretisk i degrowth.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#e3160b] font-bold">•</span>
                  <span>Å jobbe for økt forestillingsevne om en fremtid vi kan glede oss til</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#e3160b] font-bold">•</span>
                  <span>Å bruke kunst og kreativ formidling til å gjøre oss forstått</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Articles Grid */}
          {articles && articles.length > 0 && (
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
          )}

          {/* No articles message */}
          {(!articles || articles.length === 0) && (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="font-['JetBrains_Mono',monospace] text-gray-600 text-left">
                Ingen artikler publisert ennå.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default async function RessursarPage() {
  const supabase = await createClient();
  
  // Fetch all resources grouped by category
  const { data: resources } = await supabase
    .from("resources")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

  // Group resources by category
  const groupedResources = resources?.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof resources>);

  const categoryTitles = {
    books: 'Anbefalt lesing',
    films: 'Filmar og dokumentarar',
    networks: 'Nettverk vi er del av',
    tools: 'Verktøy for endringsarbeid',
    concepts: 'Sentrale konsept'
  };

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
            Ressursar
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
        <div className="space-y-12">
          {Object.entries(categoryTitles).map(([category, title]) => {
            const items = groupedResources?.[category] || [];
            if (items.length === 0) return null;
            
            return (
              <section key={category} className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
                <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-2xl font-bold mb-6">
                  {title}
                </h2>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="font-['JetBrains_Mono',monospace] text-[#000000] text-lg">
                      <span className="font-bold">{item.title}</span>
                      {item.author && <span className="text-gray-600">, {item.author}</span>}
                      {item.year && <span className="text-gray-600"> ({item.year})</span>}
                      {item.description && <span className="text-gray-600"> - {item.description}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

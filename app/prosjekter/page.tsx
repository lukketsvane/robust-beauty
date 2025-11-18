import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default async function ProsjekterPage() {
  const supabase = await createClient();
  
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true });

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
            Prosjekter
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
        {/* Hero Section */}
        <div className="mb-16">
          <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-8">
            Våre prosjekter
          </h2>
          <p className="font-['JetBrains_Mono',monospace] text-[#000000] text-lg leading-relaxed">
            Robust driver prosjektbasert endringsarbeid. Vi skaper møteplasser, sprer kunnskap og bygger allianser. Her finner du noen av prosjektene våre.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="space-y-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <h3 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-2xl font-bold flex-1">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className={`text-xs px-3 py-1 rounded font-['JetBrains_Mono',monospace] ${
                      project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'ongoing' ? 'Pågående' : 
                       project.status === 'completed' ? 'Fullført' : 'Planlagt'}
                    </span>
                  )}
                </div>
                
                {project.description && (
                  <p className="font-['JetBrains_Mono',monospace] text-gray-700 text-base mb-6 font-bold">
                    {project.description}
                  </p>
                )}
                
                {project.featured_image_url && (
                  <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={project.featured_image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {project.content && (
                  <div className="font-['JetBrains_Mono',monospace] text-gray-700 text-sm prose prose-sm max-w-none">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8">
            <p className="font-['JetBrains_Mono',monospace] text-gray-600">
              Ingen prosjekter publisert ennå.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

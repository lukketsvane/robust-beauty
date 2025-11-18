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
        <div className="prose prose-lg max-w-none">
          {/* Hero Section */}
          <div className="mb-16">
            <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-8 text-left">
              Våre prosjekter
            </h2>
            <p className="font-['JetBrains_Mono',monospace] text-[#000000] text-lg leading-relaxed text-left">
              Her finner du oversikt over våre pågående og tidligere prosjekter som jobber for å spre kunnskap om postvekst samfunn.
            </p>
          </div>

          {projects && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {project.featured_image_url && (
                    <div className="aspect-video relative">
                      <Image
                        src={project.featured_image_url || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-xl font-bold">
                        {project.title}
                      </h3>
                      {project.status && (
                        <span className={`text-xs px-2 py-1 rounded font-['JetBrains_Mono',monospace] ${
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
                      <p className="font-['JetBrains_Mono',monospace] text-gray-700 text-sm mb-3">
                        {project.description}
                      </p>
                    )}
                    {project.content && (
                      <div className="font-['JetBrains_Mono',monospace] text-gray-600 text-sm prose prose-sm">
                        <ReactMarkdown>{project.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No projects message */}
          {(!projects || projects.length === 0) && (
            <div className="bg-white rounded-lg p-8">
              <p className="font-['JetBrains_Mono',monospace] text-gray-600 text-left">
                Ingen prosjekter publisert ennå.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

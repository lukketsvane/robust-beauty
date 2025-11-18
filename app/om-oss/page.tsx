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

  const { data: teamMembers } = await supabase
    .from("team_members")
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

        {teamMembers && teamMembers.length > 0 && (
          <section className="mb-16">
            <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl md:text-4xl font-bold mb-6">
              Menneskene i Robust
            </h2>
            <p className="font-['JetBrains_Mono',monospace] text-[#000000] text-lg mb-8">
              Robust består av fem medlemmer med ulike bakgrunner. Vi kaller oss gjerne "snegler" - sakte, men målrettet, og alltid med oss det vi trenger på ryggen. Sammen utgjør vi et mycelium av kompetanse og engasjement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg p-6 shadow-sm">
                  {member.featured_image_url && (
                    <div className="w-20 h-20 rounded-full mb-4 mx-auto overflow-hidden relative">
                      <Image
                        src={member.featured_image_url || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-['JetBrains_Mono',monospace] font-bold text-[#e3160b] text-lg mb-2">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="font-['JetBrains_Mono',monospace] text-sm text-gray-600 mb-4 italic">
                      {member.role}
                    </p>
                  )}
                  {member.cv_text && (
                    <div className="font-['JetBrains_Mono',monospace] text-gray-700 text-sm leading-relaxed mb-4">
                      <ReactMarkdown>{member.cv_text}</ReactMarkdown>
                    </div>
                  )}
                  {member.personal_text && (
                    <div className="font-['JetBrains_Mono',monospace] text-gray-600 text-sm leading-relaxed italic">
                      <ReactMarkdown>{member.personal_text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

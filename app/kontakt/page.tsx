import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';

export default function KontaktPage() {
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
            Kontakt
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
      <main className="max-w-[800px] mx-auto px-6 py-12">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="font-['JetBrains_Mono',monospace] text-[#e3160b] text-3xl font-bold mb-8">
            Ta kontakt med oss
          </h2>
          
          <div className="space-y-6 font-['JetBrains_Mono',monospace]">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#e3160b] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[#e3160b] font-bold text-lg mb-2">E-post</h3>
                <a 
                  href="mailto:kontakt@foreningenrobust.no"
                  className="text-gray-700 hover:text-[#e3160b] transition-colors"
                >
                  kontakt@foreningenrobust.no
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Linkedin className="w-6 h-6 text-[#e3160b] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[#e3160b] font-bold text-lg mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/company/foreningen-robust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#e3160b] transition-colors"
                >
                  Følg oss på LinkedIn
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-[#e3160b] font-bold text-lg mb-2">Organisasjonsnummer</h3>
              <p className="text-gray-700">123 456 789</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

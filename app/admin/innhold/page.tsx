import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { ContentManager } from "@/components/admin/content-manager";

export default async function InnholdPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span className="font-['JetBrains_Mono',monospace]">Tilbake</span>
            </Link>
            <h1 className="text-2xl font-bold font-['JetBrains_Mono',monospace]">
              Innholdsadministrasjon
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <ContentManager />
      </main>
    </div>
  );
}

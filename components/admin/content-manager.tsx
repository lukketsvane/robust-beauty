"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface ContentSection {
  id: string;
  page_name: string;
  section_key: string;
  title: string | null;
  content: string;
  order_index: number;
  published: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  cv_text: string | null;
  personal_text: string | null;
  featured_image_url: string | null;
  order_index: number;
  published: boolean;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  featured_image_url: string | null;
  status: string;
  order_index: number;
  published: boolean;
}

export function ContentManager() {
  const [activeTab, setActiveTab] = useState<"sections" | "team" | "projects">("sections");

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("sections")}
          className={`px-4 py-2 font-['JetBrains_Mono',monospace] ${
            activeTab === "sections"
              ? "border-b-2 border-[#e3160b] text-[#e3160b]"
              : "text-gray-600"
          }`}
        >
          Innholdsseksjoner
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 font-['JetBrains_Mono',monospace] ${
            activeTab === "team"
              ? "border-b-2 border-[#e3160b] text-[#e3160b]"
              : "text-gray-600"
          }`}
        >
          Teammedlemmer
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 font-['JetBrains_Mono',monospace] ${
            activeTab === "projects"
              ? "border-b-2 border-[#e3160b] text-[#e3160b]"
              : "text-gray-600"
          }`}
        >
          Prosjekter
        </button>
      </div>

      {activeTab === "sections" && <ContentSectionManager />}
      {activeTab === "team" && <TeamMemberManager />}
      {activeTab === "projects" && <ProjectManager />}
    </div>
  );
}

function ContentSectionManager() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-['JetBrains_Mono',monospace]">
          Innholdsseksjoner
        </h2>
        <Button className="bg-[#e3160b] hover:bg-[#c41309]">
          <Plus className="w-4 h-4 mr-2" />
          Ny seksjon
        </Button>
      </div>
      <p className="text-sm text-gray-600 font-['JetBrains_Mono',monospace]">
        Rediger innholdsseksjoner for Om oss, Prosjekter og andre sider.
      </p>
    </div>
  );
}

function TeamMemberManager() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-['JetBrains_Mono',monospace]">
          Teammedlemmer
        </h2>
        <Button className="bg-[#e3160b] hover:bg-[#c41309]">
          <Plus className="w-4 h-4 mr-2" />
          Nytt medlem
        </Button>
      </div>
      <p className="text-sm text-gray-600 font-['JetBrains_Mono',monospace]">
        Administrer teammedlemmer som vises på Om oss-siden og hjemmesiden.
      </p>
    </div>
  );
}

function ProjectManager() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold font-['JetBrains_Mono',monospace]">
          Prosjekter
        </h2>
        <Button className="bg-[#e3160b] hover:bg-[#c41309]">
          <Plus className="w-4 h-4 mr-2" />
          Nytt prosjekt
        </Button>
      </div>
      <p className="text-sm text-gray-600 font-['JetBrains_Mono',monospace]">
        Administrer prosjekter som vises på Prosjekter-siden.
      </p>
    </div>
  );
}

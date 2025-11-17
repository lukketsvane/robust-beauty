"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, LinkIcon, ImageIcon, Eye, EyeOff, Heading1, Heading2, Quote, Code } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ImageUpload } from "./image-upload";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-content") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  const handleImageInsert = (url: string) => {
    insertMarkdown(`![Bildetekst](${url})`);
    setShowImageUpload(false);
  };

  const toolbarButtons = [
    { icon: Heading1, action: () => insertMarkdown("# "), label: "Overskrift 1" },
    { icon: Heading2, action: () => insertMarkdown("## "), label: "Overskrift 2" },
    { icon: Bold, action: () => insertMarkdown("**", "**"), label: "Fet" },
    { icon: Italic, action: () => insertMarkdown("_", "_"), label: "Kursiv" },
    { icon: List, action: () => insertMarkdown("- "), label: "Punktliste" },
    { icon: ListOrdered, action: () => insertMarkdown("1. "), label: "Nummerert liste" },
    { icon: Quote, action: () => insertMarkdown("> "), label: "Sitat" },
    { icon: Code, action: () => insertMarkdown("`", "`"), label: "Kode" },
    { icon: LinkIcon, action: () => insertMarkdown("[lenketekst](", ")"), label: "Lenke" },
  ];

  return (
    <div className="space-y-2 max-w-full overflow-x-auto">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border border-input bg-background p-2 flex-wrap">
        {toolbarButtons.map((btn, idx) => (
          <Button
            key={idx}
            type="button"
            variant="ghost"
            size="sm"
            onClick={btn.action}
            title={btn.label}
            className="h-8 w-8 p-0 flex-shrink-0"
          >
            <btn.icon size={16} />
          </Button>
        ))}
        <div className="w-px h-6 bg-border mx-1 flex-shrink-0" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageUpload(!showImageUpload)}
          title="Sett inn bilde"
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <ImageIcon size={16} />
        </Button>
        <div className="flex-1 min-w-[20px]" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          title={showPreview ? "Vis editor" : "Vis forhåndsvisning"}
          className="h-8 px-3 flex-shrink-0"
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          <span className="ml-2 text-xs">{showPreview ? "Rediger" : "Forhåndsvisning"}</span>
        </Button>
      </div>

      {/* Image Upload Panel */}
      {showImageUpload && (
        <div className="border border-input bg-background p-4">
          <p className="text-sm font-medium mb-2">Last opp bilde</p>
          <ImageUpload
            value=""
            onChange={handleImageInsert}
          />
        </div>
      )}

      {/* Editor/Preview */}
      {showPreview ? (
        <div className="min-h-[400px] max-w-full border border-input bg-background p-4 prose prose-sm overflow-x-auto overflow-wrap-anywhere">
          <ReactMarkdown className="break-words">{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          id="markdown-content"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={20}
          className="w-full max-w-full min-h-[400px] border border-input bg-background px-3 py-2 text-sm font-mono resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring break-all overflow-x-auto"
        />
      )}

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1 bg-muted p-3">
        <p className="font-semibold">Markdown tips:</p>
        <ul className="list-disc list-inside space-y-0.5 ml-2">
          <li><code className="bg-background px-1"># Overskrift 1</code>, <code className="bg-background px-1">## Overskrift 2</code></li>
          <li><code className="bg-background px-1">**fet tekst**</code>, <code className="bg-background px-1">_kursiv tekst_</code></li>
          <li><code className="bg-background px-1">[lenketekst](https://url.no)</code></li>
          <li><code className="bg-background px-1">![alt tekst](bilde-url)</code></li>
        </ul>
      </div>
    </div>
  );
}

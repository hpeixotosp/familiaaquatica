"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar matérias..."
        className="border border-slate-200 rounded-full px-4 py-1.5 text-sm w-44 xl:w-52 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all bg-slate-50"
      />
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-sky-600 hover:bg-sky-700 text-white shrink-0"
        aria-label="Buscar"
      >
        <Search className="w-4 h-4" />
      </Button>
    </form>
  );
}

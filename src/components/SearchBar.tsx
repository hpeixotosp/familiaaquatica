"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-slate-100 hover:bg-slate-200"
        aria-label="Abrir busca"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-4 h-4 text-slate-600" />
      </Button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar matérias..."
        className="border border-slate-300 rounded-full px-4 py-1.5 text-sm w-52 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
      />
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-sky-600 hover:bg-sky-700 text-white shrink-0"
        aria-label="Buscar"
      >
        <Search className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full bg-slate-100 hover:bg-slate-200 shrink-0"
        aria-label="Fechar busca"
        onClick={handleClose}
      >
        <X className="w-4 h-4 text-slate-600" />
      </Button>
    </form>
  );
}

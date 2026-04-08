"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visível só no mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Dropdown nav — aparece abaixo do header */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50">
          <nav className="flex flex-col divide-y divide-slate-100">
            {[
              ["Página Inicial", "/"],
              ["Quem Somos", "/quem-somos"],
              ["Fotos", "/fotos"],
              ["Contato", "/contato"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="px-6 py-4 text-slate-700 font-bold text-sm uppercase tracking-wider hover:bg-sky-50 hover:text-sky-700 transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

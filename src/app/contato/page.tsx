import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";

export const metadata = {
  title: "Contato | Família Aquática",
  description:
    "Entre em contato com o Família Aquática. Envie críticas, sugestões e elogios por e-mail ou pelas redes sociais.",
};

const socials = [
  {
    name: "Instagram",
    handle: "@familaquatica",
    url: "https://www.instagram.com/familaquatica",
    bg: "from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    icon: (
      // Instagram SVG
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@familaquatica",
    url: "https://twitter.com/familaquatica",
    bg: "from-slate-900 to-slate-700",
    icon: (
      // X (Twitter) SVG
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "Flávio Barbosa",
    url: "https://www.youtube.com/@FlavioBarbosa",
    bg: "from-red-600 to-red-700",
    icon: (
      // YouTube SVG
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "Família Aquática",
    url: "https://www.facebook.com/familaquatica",
    bg: "from-[#1877f2] to-[#0c5bba]",
    icon: (
      // Facebook SVG
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-[#f3f6f9] font-sans">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/" aria-label="Voltar à home">
            <div className="relative h-[72px] w-[240px] shrink-0">
              <Image
                src="/logo-cabecalho.jpg"
                alt="Família Aquática"
                fill
                sizes="240px"
                priority
                className="object-contain object-left mix-blend-multiply contrast-[1.1] scale-[1.25] origin-left [clip-path:inset(4px)]"
              />
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-sky-600 font-bold gap-2 shrink-0">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-[860px] mx-auto px-6 py-16">
        {/* Hero */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0c4a6e] to-[#011a2e] px-10 py-14 md:px-16 md:py-16 mb-12 text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-sky-400" />
              <span className="text-sky-300 font-bold uppercase tracking-widest text-sm">Fale conosco</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
              Contato
            </h1>
            <p className="text-sky-100/80 text-lg leading-relaxed">
              Envie suas críticas, sugestões e elogios. Adoramos ouvir a Família das Águas!
            </p>
          </div>
        </div>

        {/* Social Media */}
        <h2 className="font-heading font-black text-slate-900 text-2xl mb-5">Redes Sociais</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-6 flex flex-col items-center gap-3 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.bg}`} />
              <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                {s.icon}
                <span className="font-heading font-black text-sm">{s.name}</span>
                <span className="text-white/70 text-xs font-semibold">{s.handle}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Email Cards */}
        <h2 className="font-heading font-black text-slate-900 text-2xl mb-5">E-mail</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <a
            href="mailto:familaquatica@bol.com.br"
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10 hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-sky-50 group-hover:bg-sky-100 flex items-center justify-center transition-colors">
              <Mail className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">E-mail do site</p>
              <p className="font-heading font-black text-slate-900 text-lg group-hover:text-sky-700 transition-colors break-all">
                familaquatica@bol.com.br
              </p>
            </div>
            <span className="text-xs text-sky-600 font-bold group-hover:underline mt-auto">Enviar mensagem →</span>
          </a>

          <a
            href="mailto:flaviobarbosa.mg@gmail.com"
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10 hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-sky-50 group-hover:bg-sky-100 flex items-center justify-center transition-colors">
              <Send className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">E-mail pessoal — Flávio Barbosa</p>
              <p className="font-heading font-black text-slate-900 text-lg group-hover:text-sky-700 transition-colors break-all">
                flaviobarbosa.mg@gmail.com
              </p>
            </div>
            <span className="text-xs text-sky-600 font-bold group-hover:underline mt-auto">Enviar mensagem →</span>
          </a>
        </div>

        {/* Bottom note */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <p className="text-slate-600 text-lg leading-relaxed">
            Adoramos receber <strong>sugestões de pauta</strong>, <strong>fotos de eventos</strong> e{" "}
            <strong>dicas de competições</strong>!
          </p>
          <p className="text-slate-400 text-sm mt-3">
            Flávio Barbosa · DRT: 8413/DF · MTB: 78893/SP
          </p>
        </div>
      </main>
    </div>
  );
}

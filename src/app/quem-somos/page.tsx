import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Waves, Camera, Radio, Award } from "lucide-react";

export const metadata = {
  title: "Quem Somos | Família Aquática",
  description:
    "Conheça a história do Família Aquática — o portal de natação criado por Flávio Barbosa, apaixonado pelo mundo das águas desde 2012.",
};

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen bg-[#f3f6f9] font-sans">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/" aria-label="Voltar à home">
            <div className="relative h-[86px] w-[288px] shrink-0">
              <Image
                src="/logo-cabecalho.jpg"
                alt="Família Aquática"
                fill
                sizes="288px"
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

      <main className="max-w-[900px] mx-auto px-6 py-16">
        {/* Hero */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0c4a6e] to-[#011a2e] px-10 py-14 md:px-16 md:py-16 mb-12 text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Waves className="w-8 h-8 text-sky-400" />
              <span className="text-sky-300 font-bold uppercase tracking-widest text-sm">Sobre nós</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
              Quem Somos
            </h1>
            <p className="text-sky-100/80 text-lg md:text-xl leading-relaxed">
              Um cantinho para discussões, notícias e coberturas dos eventos da natação brasileira e mundial.
            </p>
          </div>
        </div>

        {/* Bio Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-10 md:p-14 mb-8">
          <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-justify mb-8">
            Olá! Este é o site que vai mostrar, de um ponto de vista revolucionário, tudo o que rola no mundo das águas!
            Eu, <strong className="text-sky-700">Flávio Barbosa</strong>, resolvi criar este site porque, desde criança,
            sou apaixonado por natação, e desde 2012 — quando, através de uma amiga, assisti meu primeiro campeonato
            in loco, o Troféu José Finkel em São Paulo — me encantei de vez com este mundo maravilhoso!
          </p>
          <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-justify">
            Assim sendo, nasceu o nosso cantinho para discussões, notícias e coberturas dos eventos da natação
            brasileira e mundial! Espero poder contar com a <strong className="text-sky-700">Família das águas</strong> na
            divulgação deste site! Sejam bem-vindos e aproveitem!
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-sky-50 flex items-center justify-center">
              <Radio className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-lg">Radialista</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Comunicador de formação, trazendo a narrativa vibrante do esporte para o texto.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-sky-50 flex items-center justify-center">
              <Camera className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-lg">Coberturas in Loco</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Cobre torneios, treinos e tomadas de tempo presencialmente desde 2012.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 flex flex-col gap-3">
            <div className="w-11 h-11 rounded-full bg-sky-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-sky-600" />
            </div>
            <h3 className="font-heading font-black text-slate-900 text-lg">Credenciais</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              DRT: 8413/DF · MTB: 78893/SP<br />
              Escrevente Técnico Judiciário — TJ/SP
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-sky-600 to-cyan-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-sky-600/20">
          <p className="font-heading font-black text-xl mb-4">Gostou? Entre em contato!</p>
          <Link href="/contato">
            <Button className="bg-white text-sky-700 hover:bg-sky-50 font-bold rounded-full px-8">
              Fale conosco
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

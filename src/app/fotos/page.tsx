import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Fotos | Família Aquática",
  description:
    "Confira as fotos das coberturas in loco do Família Aquática — álbuns dos principais campeonatos de natação do Brasil.",
};

const albums = [
  {
    title: "Troféu Salvador Granieri Sobrinho",
    url: "https://www.flickr.com/photos/143283915@N03/sets/72157669579937416",
    year: "2016",
    description: "Campeonato Paulista · Cobertura completa com fotos das provas e atletas",
  },
  {
    title: "Troféu José Finkel",
    url: "https://www.flickr.com/photos/143283915@N03/collections/72157670725802134/",
    year: "2016–2018",
    description: "Campeonato Brasileiro Interclubes · Múltiplas edições cobertas presencialmente",
  },
  {
    title: "Troféu Maria Lenk 2017",
    url: "https://www.flickr.com/photos/143283915@N03/albums/72157675101713531",
    year: "2017",
    description: "Principal campeonato classificatório para Mundiais · Piscina do Tijuca",
  },
  {
    title: "Torneio Regional de Natação — Unisanta",
    url: "https://www.flickr.com/photos/143283915@N03/albums/72157676868288455",
    year: "2017",
    description: "Competição regional universitária · Santos, SP",
  },
  {
    title: "Open CBDA / Troféu Daltely Guimarães",
    url: "https://www.flickr.com/photos/143283915@N03/collections/72157678857908416/",
    year: "2017",
    description: "Competição aberta da CBDA · Fotos dos bastidores e provas",
  },
  {
    title: "Troféu Maria Lenk 2017 — Seletiva Mundial",
    url: "https://www.flickr.com/photos/143283915@N03/collections/72157683549670695/",
    year: "2017",
    description: "Seletiva para o Campeonato Mundial de Budapest",
  },
  {
    title: "Jogos Regionais 2018",
    url: "https://www.flickr.com/photos/143283915@N03/albums/72157691534572850",
    year: "2018",
    description: "Jogos Regionais do Estado de São Paulo · Natação",
  },
  {
    title: "XXXV Jogos Unisanta 2018",
    url: "https://www.flickr.com/photos/143283915@N03/albums/72157691535057830",
    year: "2018",
    description: "Jogos universitários da Unisanta · Santos, SP",
  },
  {
    title: "Campeonato Paulista de Inverno 2018",
    url: "https://www.flickr.com/photos/143283915@N03/collections/72157692139886420/",
    year: "2018",
    description: "Campeonato Paulista de Verão e Inverno · Troféu Salvador Granieri",
  },
  {
    title: "Troféu José Finkel 2018",
    url: "https://www.flickr.com/photos/143283915@N03/albums/72157703483688385",
    year: "2018",
    description: "Edição 2018 do Campeonato Brasileiro Interclubes · Cobertura completa",
  },
];

export default function FotosPage() {
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

      <main className="max-w-[1100px] mx-auto px-6 py-16">
        {/* Hero */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0c4a6e] to-[#011a2e] px-10 py-14 md:px-16 md:py-16 mb-12 text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-8 h-8 text-sky-400" />
              <span className="text-sky-300 font-bold uppercase tracking-widest text-sm">Galeria</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black leading-tight mb-4 tracking-tight">Fotos</h1>
            <p className="text-sky-100/80 text-lg leading-relaxed">
              Confira as fotos de algumas das nossas coberturas in loco nos principais campeonatos de natação do Brasil.
            </p>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {albums.map((album) => (
            <a
              key={album.url}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/10 hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1.5 block">{album.year}</span>
                  <h2 className="font-heading font-black text-slate-900 text-lg leading-snug group-hover:text-sky-700 transition-colors">
                    {album.title}
                  </h2>
                </div>
                <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 group-hover:bg-sky-100 flex items-center justify-center transition-colors mt-1">
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{album.description}</p>
              <span className="text-xs text-sky-600 font-bold group-hover:underline mt-auto pt-2">
                Ver álbum no Flickr →
              </span>
            </a>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          Todos os álbuns estão hospedados no{" "}
          <a
            href="https://www.flickr.com/photos/143283915@N03/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline font-bold"
          >
            Flickr do Família Aquática
          </a>
          .
        </p>
      </main>
    </div>
  );
}

"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Competition } from "./CompetitionCalendar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Video } from "lucide-react";

export function CompetitionInfo({ competition }: { competition: Competition | null }) {
  if (!competition) {
    return (
      <div className="h-full flex items-center justify-center rounded-xl border border-slate-700 border-dashed p-6">
        <p className="text-center text-slate-400 text-sm">
          Selecione uma data destacada no calendário para ver os detalhes da competição.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs font-semibold text-sky-400 mb-1 capitalize">
              {format(competition.date, "EEEE, d 'de' MMMM", { locale: ptBR })}
            </p>
            <h4 className="text-base font-black text-white leading-tight">{competition.name}</h4>
          </div>
          {competition.coverage === "In Loco" && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white shrink-0 shadow-sm uppercase text-[10px] tracking-wider px-2">
              In Loco
            </Badge>
          )}
          {competition.coverage === "Remota" && (
            <Badge variant="outline" className="border-sky-600 text-sky-400 shrink-0 text-[10px] uppercase">
              Remota
            </Badge>
          )}
        </div>
      </div>
      {/* Details */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{competition.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Clock className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{competition.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Video className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Cobertura: <strong className="text-white">{competition.coverage}</strong></span>
        </div>
      </div>
    </div>
  );
}

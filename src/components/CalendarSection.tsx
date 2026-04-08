"use client";

import { useState } from "react";
import { Competition, CompetitionCalendar } from "./CompetitionCalendar";
import { CompetitionInfo } from "./CompetitionInfo";

export function CalendarSection() {
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-auto">
        <h3 className="font-semibold text-lg text-white mb-3">Calendário de Competições</h3>
        <CompetitionCalendar onSelectCompetition={setSelectedComp} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-transparent mb-3 hidden md:block select-none" aria-hidden="true">-</h3>
        <CompetitionInfo competition={selectedComp} />
      </div>
    </div>
  );
}

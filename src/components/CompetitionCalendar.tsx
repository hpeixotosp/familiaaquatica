"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

export type Competition = {
  date: Date;
  name: string;
  location: string;
  time: string;
  coverage: "In Loco" | "Remota" | "Sem Cobertura";
};

const MOCK_COMPETITIONS: Competition[] = [
  {
    date: new Date(2026, 3, 10), // April 10, 2026
    name: "Troféu Brasil",
    location: "São Paulo, SP",
    time: "09:00 - 18:00",
    coverage: "In Loco",
  },
  {
    date: new Date(2026, 3, 15), // April 15, 2026
    name: "Copa FINA de Natação",
    location: "Rio de Janeiro, RJ",
    time: "14:00 - 20:00",
    coverage: "Remota",
  },
  {
    date: new Date(2026, 3, 22), // April 22, 2026
    name: "Troféu Maria Lenk",
    location: "Recife, PE",
    time: "08:30 - 17:00",
    coverage: "In Loco",
  },
];

interface CompetitionCalendarProps {
  onSelectCompetition: (comp: Competition | null) => void;
}

export function CompetitionCalendar({ onSelectCompetition }: CompetitionCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 3, 1));

  const competitionDates = MOCK_COMPETITIONS.map((c) => c.date);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!selectedDate) {
      onSelectCompetition(null);
      return;
    }
    const comp = MOCK_COMPETITIONS.find(
      (c) =>
        c.date.getDate() === selectedDate.getDate() &&
        c.date.getMonth() === selectedDate.getMonth() &&
        c.date.getFullYear() === selectedDate.getFullYear()
    );
    onSelectCompetition(comp || null);
  };

  return (
    // Wrapper overrides CSS variables so the shadcn Calendar renders with the dark palette
    <div
      style={{
        // Selected day → amber yellow
        ["--primary" as string]: "#f59e0b",
        ["--primary-foreground" as string]: "#1e293b",
        // "today" background → subtle dark slate (replaces bg-muted white)
        ["--muted" as string]: "#334155",
        ["--muted-foreground" as string]: "#94a3b8",
        // General foreground → white text for all days
        ["--foreground" as string]: "#ffffff",
        ["--accent" as string]: "#334155",
        ["--accent-foreground" as string]: "#ffffff",
      }}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        locale={ptBR}
        defaultMonth={new Date(2026, 3)}
        className="bg-transparent border-0 text-white"
        classNames={{
          // Override "today" cell — uses shadcn v9 key name
          today: "bg-slate-700 text-sky-300 font-bold rounded-md",
          // Day numbers
          weekday: "text-slate-400 font-medium text-[0.8rem]",
          outside: "text-slate-600 opacity-40",
          disabled: "text-slate-600 opacity-30",
        }}
        modifiers={{
          competition: competitionDates,
        }}
        modifiersClassNames={{
          competition: "ring-2 ring-sky-400 ring-offset-1 ring-offset-slate-900",
        }}
      />
    </div>
  );
}

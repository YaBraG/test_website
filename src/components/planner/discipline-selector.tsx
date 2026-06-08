"use client";

import { useState } from "react";
import { Discipline, disciplines } from "@/data/disciplines";

type DisciplineSelectorProps = {
  selectedDisciplineId: string;
  onSelectDiscipline: (disciplineId: string) => void;
};

export function DisciplineSelector({
  selectedDisciplineId,
  onSelectDiscipline,
}: DisciplineSelectorProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const selectedDiscipline = disciplines.find(
    (discipline) => discipline.id === selectedDisciplineId,
  );

  function handleSelectDiscipline(discipline: Discipline) {
    if (discipline.status === "unavailable") {
      setErrorMessage(`${discipline.name} is not available yet.`);
      return;
    }

    setErrorMessage("");
    onSelectDiscipline(discipline.id);
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {disciplines.map((discipline) => (
          <DisciplineButton
            key={discipline.id}
            discipline={discipline}
            isSelected={discipline.id === selectedDisciplineId}
            onSelect={handleSelectDiscipline}
          />
        ))}
      </div>

      {selectedDiscipline ? (
        <div className="space-y-3">
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Selected discipline: {selectedDiscipline.name}. The next planner
            step will build from this choice.
          </p>

          {selectedDiscipline.status === "working" ? (
            <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              This pathway is still being built.
            </p>
          ) : null}
        </div>
      ) : null}

      {errorMessage ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

type DisciplineButtonProps = {
  discipline: Discipline;
  isSelected: boolean;
  onSelect: (discipline: Discipline) => void;
};

function DisciplineButton({
  discipline,
  isSelected,
  onSelect,
}: DisciplineButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(discipline)}
      className={`rounded-md border p-4 text-left transition ${
        isSelected
          ? "border-sky-700 bg-sky-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="block text-base font-semibold text-slate-950">
          {discipline.name}
        </span>
        <StatusLabel status={discipline.status} />
      </span>
      <span className="mt-2 block text-sm leading-6 text-slate-600">
        {discipline.description}
      </span>
    </button>
  );
}

function StatusLabel({ status }: { status: Discipline["status"] }) {
  const statusText = {
    done: "Done",
    working: "Working on",
    unavailable: "Unavailable",
  };

  const statusStyles = {
    done: "bg-emerald-50 text-emerald-700",
    working: "bg-amber-50 text-amber-700",
    unavailable: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {statusText[status]}
    </span>
  );
}

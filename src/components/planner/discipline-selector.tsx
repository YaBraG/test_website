"use client";

import { Discipline, disciplines } from "@/data/disciplines";

type DisciplineSelectorProps = {
  selectedDisciplineId: string;
  onSelectDiscipline: (disciplineId: string) => void;
};

export function DisciplineSelector({
  selectedDisciplineId,
  onSelectDiscipline,
}: DisciplineSelectorProps) {
  const selectedDiscipline = disciplines.find(
    (discipline) => discipline.id === selectedDisciplineId,
  );

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {disciplines.map((discipline) => (
          <DisciplineButton
            key={discipline.id}
            discipline={discipline}
            isSelected={discipline.id === selectedDisciplineId}
            onSelect={onSelectDiscipline}
          />
        ))}
      </div>

      {selectedDiscipline ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Selected discipline: {selectedDiscipline.name}. The next planner step
          will build from this choice.
        </p>
      ) : null}
    </div>
  );
}

type DisciplineButtonProps = {
  discipline: Discipline;
  isSelected: boolean;
  onSelect: (disciplineId: string) => void;
};

function DisciplineButton({
  discipline,
  isSelected,
  onSelect,
}: DisciplineButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(discipline.id)}
      className={`rounded-md border p-4 text-left transition ${
        isSelected
          ? "border-sky-700 bg-sky-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
      }`}
    >
      <span className="block text-base font-semibold text-slate-950">
        {discipline.name}
      </span>
      <span className="mt-2 block text-sm leading-6 text-slate-600">
        {discipline.description}
      </span>
    </button>
  );
}

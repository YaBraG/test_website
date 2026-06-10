"use client";

import { useState } from "react";
import { electricalTransferUniversities } from "@/data/electrical-transfer-universities";
import type { TransferUniversity } from "@/data/electrical-transfer-universities";

const maxSelections = 3;

const statusText = {
  available: "Available",
  "needs-review": "Needs review",
};

const statusStyles = {
  available: "bg-emerald-50 text-emerald-700",
  "needs-review": "bg-amber-50 text-amber-700",
};

type TransferUniversitySelectorProps = {
  selectedUniversityIds: string[];
  onSelectedUniversityIdsChange: (universityIds: string[]) => void;
};

export function TransferUniversitySelector({
  selectedUniversityIds,
  onSelectedUniversityIdsChange,
}: TransferUniversitySelectorProps) {
  const [message, setMessage] = useState("");

  const selectedUniversities = electricalTransferUniversities.filter((university) =>
    selectedUniversityIds.includes(university.id),
  );

  function handleToggleUniversity(university: TransferUniversity) {
    const isSelected = selectedUniversityIds.includes(university.id);

    if (isSelected) {
      onSelectedUniversityIdsChange(
        selectedUniversityIds.filter(
          (universityId) => universityId !== university.id,
        ),
      );
      setMessage("");
      return;
    }

    if (selectedUniversityIds.length >= maxSelections) {
      setMessage("Select up to 3 transfer universities for this planning view.");
      return;
    }

    onSelectedUniversityIdsChange([...selectedUniversityIds, university.id]);
    setMessage("");
  }

  return (
    <section className="mt-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">
            Transfer Universities
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Select up to 3 Florida universities for future transfer planning.
          </p>
        </div>
        <p className="text-xs font-medium text-slate-500">
          {selectedUniversityIds.length} of {maxSelections} selected
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {electricalTransferUniversities.map((university) => {
          const isSelected = selectedUniversityIds.includes(university.id);

          return (
            <button
              key={university.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleToggleUniversity(university)}
              className={`rounded-md border p-3 text-left transition ${
                isSelected
                  ? "border-sky-700 bg-sky-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="block text-sm font-semibold text-slate-950">
                  {university.shortName}
                </span>
                <span
                  className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${statusStyles[university.status]}`}
                >
                  {statusText[university.status]}
                </span>
              </span>
              <span className="mt-2 block text-xs leading-5 text-slate-600">
                {university.name}
              </span>
              <span className="mt-3 block text-xs text-slate-500">
                {university.sourceNote}
              </span>
            </button>
          );
        })}
      </div>

      {selectedUniversities.length > 0 ? (
        <p className="mt-4 rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium leading-6 text-sky-800">
          Selected:{" "}
          {selectedUniversities
            .map((university) => university.shortName)
            .join(", ")}
        </p>
      ) : (
        <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          No transfer universities selected yet.
        </p>
      )}

      {message ? (
        <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800">
          {message}
        </p>
      ) : null}

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Transfer requirement comparison uses the first structured Electrical
        Engineering source records.
      </p>
    </section>
  );
}

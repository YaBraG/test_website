"use client";

import { useState } from "react";
import { engineeringTracks } from "@/data/engineering-tracks";
import type { EngineeringTrack } from "@/data/engineering-tracks";

const defaultTrackId = "electrical-engineering";

const statusText = {
  available: "Available",
  working: "Working",
  unavailable: "Unavailable",
};

const statusStyles = {
  available: "bg-emerald-50 text-emerald-700",
  working: "bg-amber-50 text-amber-700",
  unavailable: "bg-slate-100 text-slate-500",
};

export function EngineeringTrackSelector() {
  const [selectedTrackId, setSelectedTrackId] = useState(defaultTrackId);
  const [message, setMessage] = useState("");

  function handleSelectTrack(track: EngineeringTrack) {
    if (track.status === "available") {
      setSelectedTrackId(track.id);
      setMessage("");
      return;
    }

    const readiness =
      track.status === "working" ? "is still being built" : "is not available yet";

    setMessage(`${track.name} ${readiness}. ${track.transferNotes}`);
  }

  return (
    <section className="mt-4 rounded-md border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">
            Engineering Track
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Choose the Engineering track for this planner view.
          </p>
        </div>
        <p className="text-xs font-medium text-slate-500">
          Electrical Engineering selected by default
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {engineeringTracks.map((track) => (
          <button
            key={track.id}
            type="button"
            aria-pressed={track.id === selectedTrackId}
            onClick={() => handleSelectTrack(track)}
            className={`rounded-md border p-4 text-left transition ${
              track.id === selectedTrackId
                ? "border-sky-700 bg-sky-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-start justify-between gap-3">
              <span className="block text-sm font-semibold text-slate-950">
                {track.name}
              </span>
              <span
                className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${statusStyles[track.status]}`}
              >
                {statusText[track.status]}
              </span>
            </span>
            <span className="mt-2 block text-sm leading-6 text-slate-600">
              {track.description}
            </span>
            <span className="mt-3 block text-xs font-medium text-slate-500">
              MDC track: {track.relatedMdcTrack}
            </span>
          </button>
        ))}
      </div>

      {message ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800">
          {message}
        </p>
      ) : null}
    </section>
  );
}

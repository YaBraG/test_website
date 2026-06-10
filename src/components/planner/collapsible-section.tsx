"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type CollapsibleSectionProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      className="group rounded-md border border-slate-200 bg-white"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md px-4 py-3 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-sm font-semibold text-slate-950">
            {title}
          </span>
          {description ? (
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              {description}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-200 text-sm font-semibold text-slate-500 transition group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-slate-200 p-4">{children}</div>
    </details>
  );
}

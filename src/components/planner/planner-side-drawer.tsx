import type { ReactNode } from "react";

type PlannerSideDrawerProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

export function PlannerSideDrawer({
  isOpen,
  title,
  description,
  onClose,
  children,
}: PlannerSideDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20">
      <button
        type="button"
        aria-label="Close planner setup"
        className="absolute inset-0 bg-slate-950/20"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-[34rem] flex-col border-l border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
}

import type { ReactNode } from "react";

type CourseOptionsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function CourseOptionsDrawer({
  isOpen,
  onClose,
  children,
}: CourseOptionsDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20">
      <button
        type="button"
        aria-label="Close course options"
        className="absolute inset-0 bg-slate-950/20"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Course Options
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Sample Electrical Engineering courses from the current source
              documents.
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

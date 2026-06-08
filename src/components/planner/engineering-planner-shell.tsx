const mapSections = [
  "General Education",
  "Discipline General Education",
  "Institution Track Requirements",
  "Transfer Core Requirements",
];

const optionSections = [
  "General Ed Options",
  "Discipline Options",
  "Track Options",
  "Transfer Options",
];

const legendItems = [
  {
    label: "Approved and offered by the institution",
    markerClassName: "bg-emerald-500",
  },
  {
    label: "Approved but not offered by the institution",
    markerClassName: "bg-sky-500",
  },
  {
    label: "Not approved but offered by the institution",
    markerClassName: "bg-amber-500",
  },
  {
    label: "Not approved and not offered by the institution",
    markerClassName: "bg-slate-400",
  },
];

export function EngineeringPlannerShell() {
  return (
    <section className="w-full max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          Engineering pathway
        </p>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Engineering Planner
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            This is where the student pathway will be built across requirements,
            options, and future course planning tools.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-950">
              Pathway Map
            </h2>
            <span className="rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
              Template
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {mapSections.map((sectionName) => (
              <section
                key={sectionName}
                className="min-h-36 rounded-md border border-dashed border-slate-300 bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {sectionName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Course placeholders will appear here after real Engineering
                  data is added.
                </p>
              </section>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Future Course Marker Legend
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${item.markerClassName}`}
                  />
                  <span className="text-sm text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-slate-950">
            Course Options
          </h2>
          <div className="mt-4 space-y-3">
            {optionSections.map((sectionName) => (
              <section
                key={sectionName}
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {sectionName}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Options will be listed here when course data is added.
                </p>
              </section>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

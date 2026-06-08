import { CourseCard } from "@/components/planner/course-card";
import { ElectricalPathwayMap } from "@/components/planner/electrical-pathway-map";
import { electricalEngineeringCourses } from "@/data/electrical-engineering-courses";
import type { CourseCategory } from "@/types/course-planner";

const courseCategorySections: {
  category: CourseCategory;
  title: string;
}[] = [
  {
    category: "general-education",
    title: "General Education",
  },
  {
    category: "discipline-general-education",
    title: "Discipline General Education",
  },
  {
    category: "mdc-track-requirement",
    title: "MDC Track Requirements",
  },
  {
    category: "transfer-core",
    title: "Transfer Core",
  },
];

const legendItems = [
  {
    label: "Approved and offered at MDC",
    markerClassName: "bg-emerald-500",
  },
  {
    label: "Approved but not offered at MDC",
    markerClassName: "bg-sky-500",
  },
  {
    label: "Not approved but offered at MDC",
    markerClassName: "bg-amber-500",
  },
  {
    label: "Not approved and not offered at MDC",
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

          <ElectricalPathwayMap />

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
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sample Electrical Engineering courses from the current source
            documents.
          </p>
          <div className="mt-4 space-y-5">
            {courseCategorySections.map((section) => {
              const courses = electricalEngineeringCourses.filter(
                (course) => course.category === section.category,
              );

              return (
                <section key={section.category}>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {section.title}
                  </h3>
                  <div className="mt-3 space-y-3">
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

import { electricalEngineeringCourses } from "@/data/electrical-engineering-courses";
import type { CourseCategory, PlannerCourse } from "@/types/course-planner";

type PathwayPhase = {
  id: string;
  label: string;
  courseIds: string[];
};

const pathwayPhases: PathwayPhase[] = [
  {
    id: "semester-1",
    label: "Semester 1",
    courseIds: ["ee-enc-1101", "ee-egn-1008c", "ee-chm-1045", "ee-chm-1045l"],
  },
  {
    id: "semester-2",
    label: "Semester 2",
    courseIds: ["ee-enc-1102", "ee-mac-2311"],
  },
  {
    id: "semester-3",
    label: "Semester 3",
    courseIds: ["ee-mac-2312", "ee-phy-2048", "ee-phy-2048l"],
  },
  {
    id: "semester-4",
    label: "Semester 4",
    courseIds: ["ee-mac-2313", "ee-phy-2049", "ee-phy-2049l"],
  },
  {
    id: "transfer-preparation",
    label: "Transfer preparation",
    courseIds: ["ee-map-2302", "ee-cop-2270"],
  },
];

const categoryLabels: Record<CourseCategory, string> = {
  "general-education": "General Education",
  "discipline-general-education": "Discipline General Education",
  "mdc-track-requirement": "MDC Track Requirement",
  "transfer-core": "Transfer Core",
};

export function ElectricalPathwayMap() {
  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white">
      <div className="min-w-[44rem] space-y-4 p-4">
        {pathwayPhases.map((phase) => {
          const courses = getCoursesForPhase(phase);
          const creditTotal = courses.reduce(
            (total, course) => total + course.credits,
            0,
          );

          return (
            <section
              key={phase.id}
              className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-[8rem_4rem_minmax(0,1fr)]"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-950">
                  {phase.label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Static planning row
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center">
                <p className="text-lg font-semibold text-slate-950">
                  {creditTotal}
                </p>
                <p className="text-xs font-medium text-slate-500">credits</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <PathwayCourseBox key={course.id} course={course} />
                ))}
              </div>
            </section>
          );
        })}

        <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          Prerequisite and corequisite arrows will be added later.
        </p>
      </div>
    </div>
  );
}

function getCoursesForPhase(phase: PathwayPhase) {
  return phase.courseIds
    .map((courseId) =>
      electricalEngineeringCourses.find((course) => course.id === courseId),
    )
    .filter((course): course is PlannerCourse => Boolean(course));
}

function PathwayCourseBox({ course }: { course: PlannerCourse }) {
  return (
    <article className="min-h-32 rounded-md border border-slate-300 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-sky-700">{course.code}</p>
        <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {course.credits} cr
        </span>
      </div>
      <h4 className="mt-2 text-sm font-semibold leading-5 text-slate-950">
        {course.title}
      </h4>
      <p className="mt-3 rounded bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800">
        {categoryLabels[course.category]}
      </p>
    </article>
  );
}

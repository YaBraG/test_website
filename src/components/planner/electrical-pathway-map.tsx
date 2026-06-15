import { electricalEngineeringCourses } from "@/data/electrical-engineering-courses";
import { electricalTransferRequirements } from "@/data/electrical-transfer-requirements";
import type { CourseCategory, PlannerCourse } from "@/types/course-planner";

type TransferMatchStatus =
  | "common-required"
  | "university-specific-required"
  | "not-matched";

type ElectricalPathwayMapProps = {
  selectedUniversityIds: string[];
};

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

export function ElectricalPathwayMap({
  selectedUniversityIds,
}: ElectricalPathwayMapProps) {
  const showTransferMatches = selectedUniversityIds.length > 0;

  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white">
      <div className="min-w-[78rem] space-y-4 p-4">
        {showTransferMatches ? (
          <div className="rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800">
            Transfer badges show whether a course is required by every selected
            university or only by some selected universities.
          </div>
        ) : null}

        {pathwayPhases.map((phase) => {
          const courses = getCoursesForPhase(phase);
          const creditTotal = courses.reduce(
            (total, course) => total + course.credits,
            0,
          );

          return (
            <section
              key={phase.id}
              className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-[10rem_5rem_minmax(0,1fr)]"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-950">
                  {phase.label}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Static planning row
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-md border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                >
                  + Add course
                </button>
              </div>

              <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center">
                <p className="text-lg font-semibold text-slate-950">
                  {creditTotal}
                </p>
                <p className="text-xs font-medium text-slate-500">credits</p>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {courses.map((course) => {
                  const transferMatchStatus = getTransferMatchStatus(
                    course.code,
                    selectedUniversityIds,
                  );

                  return (
                    <PathwayCourseBox
                      key={course.id}
                      course={course}
                      showTransferMatch={showTransferMatches}
                      transferMatchStatus={transferMatchStatus}
                    />
                  );
                })}
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

function getTransferMatchStatus(
  courseCode: string,
  selectedUniversityIds: string[],
): TransferMatchStatus {
  if (selectedUniversityIds.length === 0) {
    return "not-matched";
  }

  const selectedRequirements = electricalTransferRequirements.filter(
    (requirement) => selectedUniversityIds.includes(requirement.universityId),
  );
  const requiredMatchCount = selectedRequirements.filter((requirement) =>
    requirement.requiredCourses.includes(courseCode),
  ).length;

  if (requiredMatchCount === selectedUniversityIds.length) {
    return "common-required";
  }

  if (requiredMatchCount > 0) {
    return "university-specific-required";
  }

  return "not-matched";
}

function PathwayCourseBox({
  course,
  showTransferMatch,
  transferMatchStatus,
}: {
  course: PlannerCourse;
  showTransferMatch: boolean;
  transferMatchStatus: TransferMatchStatus;
}) {
  return (
    <article className="min-h-36 w-56 shrink-0 rounded-md border border-slate-300 bg-white p-3 shadow-sm">
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
      {showTransferMatch && transferMatchStatus !== "not-matched" ? (
        <TransferMatchBadge status={transferMatchStatus} />
      ) : null}
    </article>
  );
}

function TransferMatchBadge({ status }: { status: TransferMatchStatus }) {
  const badgeText = {
    "common-required": "Common required",
    "university-specific-required": "Required by selected university",
    "not-matched": "",
  };

  const badgeStyles = {
    "common-required": "border-emerald-200 bg-emerald-50 text-emerald-800",
    "university-specific-required": "border-amber-200 bg-amber-50 text-amber-800",
    "not-matched": "",
  };

  return (
    <p
      className={`mt-3 rounded border px-2 py-1 text-xs font-semibold ${badgeStyles[status]}`}
    >
      {badgeText[status]}
    </p>
  );
}

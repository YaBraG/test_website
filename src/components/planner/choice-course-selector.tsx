import type { PathwaySlot, PlannerCourse } from "@/types/course-planner";

type ChoiceCourseSelectorProps = {
  slot: PathwaySlot;
  eligibleCourses: PlannerCourse[];
  earlierCourseCodes: string[];
};

type PrerequisiteStatus = {
  label: string;
  className: string;
};

const courseCodePattern = /[A-Z]{3}\s\d{4}[A-Z]?/g;

export function ChoiceCourseSelector({
  slot,
  eligibleCourses,
  earlierCourseCodes,
}: ChoiceCourseSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-950">{slot.label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Choose one course for this {slot.credits}-credit requirement.
        </p>
      </div>

      {eligibleCourses.length === 0 ? (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-800">
          Eligible course details are not available in the current structured
          course data yet.
        </p>
      ) : null}

      <div className="space-y-3">
        {eligibleCourses.map((course) => {
          const prerequisiteStatus = getPrerequisiteStatus(
            course.prerequisites,
            earlierCourseCodes,
          );
          const isRecommended = course.code === slot.recommendedCourseCode;

          return (
            <article
              key={course.id}
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-sky-700">
                    {course.code}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-slate-950">
                    {course.title}
                  </h4>
                </div>
                <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  {course.credits} credits
                </span>
              </div>

              {isRecommended ? (
                <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                  Recommended
                </p>
              ) : null}

              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Prerequisites
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {course.prerequisites.length > 0
                    ? course.prerequisites.join("; ")
                    : "No listed prerequisites."}
                </p>
              </div>

              <p
                className={`mt-3 rounded-md border px-3 py-2 text-sm font-medium ${prerequisiteStatus.className}`}
              >
                {prerequisiteStatus.label}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function getPrerequisiteStatus(
  prerequisites: string[],
  earlierCourseCodes: string[],
): PrerequisiteStatus {
  if (prerequisites.length === 0) {
    return {
      label: "Prerequisites met.",
      className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    };
  }

  const earlierCourseCodeSet = new Set(earlierCourseCodes);
  const requiredCourseCodes: string[] = [];

  for (const prerequisite of prerequisites) {
    const parsedCodes = prerequisite.match(courseCodePattern) ?? [];
    const remainingText = prerequisite
      .replace(courseCodePattern, "")
      .replace(/\b(and|or)\b/gi, "")
      .replace(/[;,.()]/g, "")
      .trim();

    if (parsedCodes.length === 0 || remainingText.length > 0) {
      return {
        label: "Check prerequisite note.",
        className: "border-slate-200 bg-slate-50 text-slate-700",
      };
    }

    requiredCourseCodes.push(...parsedCodes);
  }

  const missingCourseCodes = requiredCourseCodes.filter(
    (courseCode) => !earlierCourseCodeSet.has(courseCode),
  );

  if (missingCourseCodes.length > 0) {
    return {
      label: `Unavailable until ${missingCourseCodes.join(", ")} is completed earlier.`,
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  return {
    label: "Prerequisites met.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  };
}

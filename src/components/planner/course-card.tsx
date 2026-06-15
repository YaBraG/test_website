import type { PlannerCourse } from "@/types/course-planner";

type CourseCardProps = {
  course: PlannerCourse;
};

const requirementTagLabels: Record<string, string> = {
  "communications-state-core": "Communications State Core",
  "communications-mdc-core": "Communications MDC Core",
  "oral-communications": "Oral Communication",
  "mathematics-state-core": "Mathematics State Core",
  "mathematics-mdc-core": "Mathematics MDC Core",
  "humanities-state-core": "Humanities State Core",
  "humanities-mdc-core": "Humanities MDC Core",
  "social-sciences-state-core": "Social Sciences State Core",
  "social-sciences-mdc-core": "Social Sciences MDC Core",
  "natural-sciences-state-core": "Natural Sciences State Core",
  "natural-sciences-mdc-core": "Natural Sciences MDC Core",
  "natural-sciences-lab": "Natural Sciences Lab",
  "first-year-experience": "First Year Experience",
  "pathway-elective": "Pathway Elective",
  "general-education-elective": "Gen Ed Elective",
};

export function CourseCard({ course }: CourseCardProps) {
  const eligibility = getEligibilityLabel(course);

  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-sky-700">{course.code}</p>
          <h4 className="mt-1 text-sm font-semibold text-slate-950">
            {course.title}
          </h4>
        </div>
        <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {course.credits} credits
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Requirement group: {course.requirementGroup}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {course.requirementTags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800"
          >
            {requirementTagLabels[tag] ?? tag}
          </span>
        ))}
        {course.flags.map((flag) => (
          <span
            key={flag}
            className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
          >
            {flag === "writing-intensive"
              ? "Writing Intensive"
              : "Computational"}
          </span>
        ))}
        {course.specialTags.includes("transfer-requirement") ? (
          <span className="rounded border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-800">
            Transfer Requirement
          </span>
        ) : null}
      </div>

      {course.isRecommended && course.recommendationReason ? (
        <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Recommended
          </p>
          <p className="mt-1 text-sm leading-5 text-emerald-800">
            {course.recommendationReason}
          </p>
        </div>
      ) : null}

      <p
        className={`mt-3 rounded-md border px-3 py-2 text-sm font-medium ${eligibility.className}`}
      >
        {eligibility.label}
      </p>
    </article>
  );
}

function getEligibilityLabel(course: PlannerCourse) {
  if (
    course.isDualEnrollmentApproved === true &&
    course.isOfferedAtMdc === true
  ) {
    return {
      label: "Dual enrollment approved and offered at MDC.",
      className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    };
  }

  if (
    course.isDualEnrollmentApproved === true &&
    course.isOfferedAtMdc === false
  ) {
    return {
      label: "Dual enrollment approved, but not offered at MDC.",
      className: "border-sky-200 bg-sky-50 text-sky-800",
    };
  }

  if (
    course.isDualEnrollmentApproved === false &&
    course.isOfferedAtMdc === true
  ) {
    return {
      label: "Not dual enrollment approved, but offered at MDC.",
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  if (
    course.isDualEnrollmentApproved === false &&
    course.isOfferedAtMdc === false
  ) {
    return {
      label: "Not dual enrollment approved and not offered at MDC.",
      className: "border-slate-200 bg-slate-50 text-slate-700",
    };
  }

  if (course.isOfferedAtMdc === true) {
    return {
      label: "Offered at MDC; dual enrollment approval not confirmed.",
      className: "border-slate-200 bg-slate-50 text-slate-700",
    };
  }

  if (course.isDualEnrollmentApproved === true) {
    return {
      label: "Dual enrollment approved; MDC offering not confirmed.",
      className: "border-sky-200 bg-sky-50 text-sky-800",
    };
  }

  return {
    label: "Eligibility not confirmed in the current source documents.",
    className: "border-slate-200 bg-slate-50 text-slate-700",
  };
}

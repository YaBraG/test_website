import { electricalEngineeringCourses } from "@/data/electrical-engineering-courses";
import { electricalTransferRequirements } from "@/data/electrical-transfer-requirements";
import type {
  CourseCategory,
  DefaultPathwaySemester,
  PathwaySlot,
  PlannerCourse,
} from "@/types/course-planner";

type TransferMatchStatus =
  | "common-required"
  | "university-specific-required"
  | "not-matched";

type ElectricalPathwayMapProps = {
  semesters: DefaultPathwaySemester[];
  selectedUniversityIds: string[];
  onChoiceSlotSelect: (slot: PathwaySlot, semesterId: string) => void;
};

const categoryLabels: Record<CourseCategory, string> = {
  "general-education": "General Education",
  "discipline-general-education": "Discipline General Education",
  "mdc-track-requirement": "MDC Track Requirement",
  "transfer-core": "Transfer Core",
};

const tagLabels: Record<string, string> = {
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

export function ElectricalPathwayMap({
  semesters,
  selectedUniversityIds,
  onChoiceSlotSelect,
}: ElectricalPathwayMapProps) {
  const showTransferMatches = selectedUniversityIds.length > 0;

  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-slate-200 bg-white">
      <div className="min-w-[92rem] space-y-4 p-4">
        {showTransferMatches ? (
          <div className="rounded-md border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800">
            Transfer badges show whether a course is required by every selected
            university or only by some selected universities.
          </div>
        ) : null}

        {semesters.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <h3 className="text-base font-semibold text-slate-950">
              Pathway plan cleared
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use Default Plan to restore the Electrical Engineering pathway.
            </p>
          </div>
        ) : null}

        {semesters.map((semester) => (
          <PathwaySemesterRow
            key={semester.id}
            semester={semester}
            selectedUniversityIds={selectedUniversityIds}
            showTransferMatches={showTransferMatches}
            onChoiceSlotSelect={onChoiceSlotSelect}
          />
        ))}

        <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          Prerequisite and corequisite arrows will be added later.
        </p>
      </div>
    </div>
  );
}

function PathwaySemesterRow({
  semester,
  selectedUniversityIds,
  showTransferMatches,
  onChoiceSlotSelect,
}: {
  semester: DefaultPathwaySemester;
  selectedUniversityIds: string[];
  showTransferMatches: boolean;
  onChoiceSlotSelect: (slot: PathwaySlot, semesterId: string) => void;
}) {
  const visibleCredits = semester.slots.reduce(
    (total, slot) => total + slot.credits,
    0,
  );

  return (
    <section className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-4 md:grid-cols-[12rem_5rem_minmax(0,1fr)]">
      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          {semester.label}
        </h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Default planning row
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
          {visibleCredits}
        </p>
        <p className="text-xs font-medium text-slate-500">credits</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {semester.slots.length === 0 ? (
          <div className="flex min-h-36 w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-4 py-6 text-sm font-medium text-slate-500">
            No visible courses in this row.
          </div>
        ) : null}

        {semester.slots.map((slot) => (
          <PathwaySlotBox
            key={slot.id}
            slot={slot}
            selectedUniversityIds={selectedUniversityIds}
            showTransferMatches={showTransferMatches}
            onChoiceSlotSelect={() => onChoiceSlotSelect(slot, semester.id)}
          />
        ))}
      </div>
    </section>
  );
}

function PathwaySlotBox({
  slot,
  selectedUniversityIds,
  showTransferMatches,
  onChoiceSlotSelect,
}: {
  slot: PathwaySlot;
  selectedUniversityIds: string[];
  showTransferMatches: boolean;
  onChoiceSlotSelect: () => void;
}) {
  if (slot.type === "choice") {
    return (
      <button
        type="button"
        onClick={onChoiceSlotSelect}
        className="min-h-36 w-60 shrink-0 rounded-md border border-dashed border-slate-300 bg-slate-100 p-3 text-left shadow-sm transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">{slot.label}</p>
          <span className="shrink-0 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700">
            {slot.credits} cr
          </span>
        </div>
        <p className="mt-3 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-600">
          Choose course
        </p>
        {slot.recommendedCourseCode ? (
          <p className="mt-3 text-xs leading-5 text-slate-600">
            Recommended:{" "}
            <span className="font-semibold text-slate-900">
              {slot.recommendedCourseCode}
            </span>
          </p>
        ) : null}
      </button>
    );
  }

  if (slot.type === "note") {
    return (
      <article className="min-h-36 w-60 shrink-0 rounded-md border border-slate-300 bg-slate-100 p-3 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">{slot.label}</p>
          <span className="shrink-0 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-700">
            {slot.credits} cr
          </span>
        </div>
        <p className="mt-3 rounded bg-white px-2 py-1 text-xs font-semibold text-slate-600">
          Planning note
        </p>
        {slot.notes?.map((note) => (
          <p key={note} className="mt-2 text-xs leading-5 text-slate-600">
            {note}
          </p>
        ))}
      </article>
    );
  }

  const course = electricalEngineeringCourses.find(
    (item) => item.code === slot.courseCode,
  );

  if (!course) {
    return (
      <article className="min-h-36 w-60 shrink-0 rounded-md border border-amber-200 bg-amber-50 p-3 shadow-sm">
        <p className="text-sm font-semibold text-amber-900">{slot.label}</p>
        <p className="mt-2 text-xs leading-5 text-amber-800">
          Course data is not available yet.
        </p>
      </article>
    );
  }

  const transferMatchStatus = getTransferMatchStatus(
    course.code,
    selectedUniversityIds,
  );

  return (
    <PathwayCourseBox
      course={course}
      showTransferMatch={showTransferMatches}
      transferMatchStatus={transferMatchStatus}
    />
  );
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
    <article className="min-h-40 w-60 shrink-0 rounded-md border border-slate-300 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-sky-700">{course.code}</p>
        <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {getCourseCreditLabel(course)}
        </span>
      </div>
      <h4 className="mt-2 text-sm font-semibold leading-5 text-slate-950">
        {course.title}
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        <Tag>{categoryLabels[course.category]}</Tag>
        {course.requirementTags.slice(0, 2).map((tag) => (
          <Tag key={tag}>{tagLabels[tag] ?? tag}</Tag>
        ))}
        {course.flags.map((flag) => (
          <Tag key={flag}>
            {flag === "writing-intensive"
              ? "Writing Intensive"
              : "Computational"}
          </Tag>
        ))}
        {course.specialTags.includes("transfer-requirement") ? (
          <TransferRequirementTag />
        ) : null}
      </div>
      {showTransferMatch && transferMatchStatus !== "not-matched" ? (
        <TransferMatchBadge status={transferMatchStatus} />
      ) : null}
    </article>
  );
}

function getCourseCreditLabel(course: PlannerCourse) {
  if (course.credits === 0 && course.sourceStatus === "pending-confirmation") {
    return "credit pending";
  }

  return `${course.credits} cr`;
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded bg-sky-50 px-2 py-1 text-xs font-medium text-sky-800">
      {children}
    </span>
  );
}

function TransferRequirementTag() {
  return (
    <span className="rounded border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-800">
      Transfer Requirement
    </span>
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

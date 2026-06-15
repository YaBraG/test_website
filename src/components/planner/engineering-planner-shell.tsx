"use client";

import { useMemo, useState } from "react";
import { ChoiceCourseSelector } from "@/components/planner/choice-course-selector";
import { CollapsibleSection } from "@/components/planner/collapsible-section";
import { CourseCard } from "@/components/planner/course-card";
import { ElectricalPathwayMap } from "@/components/planner/electrical-pathway-map";
import { EngineeringTrackSelector } from "@/components/planner/engineering-track-selector";
import { PlannerSideDrawer } from "@/components/planner/planner-side-drawer";
import { TransferRequirementSummary } from "@/components/planner/transfer-requirement-summary";
import { TransferUniversitySelector } from "@/components/planner/transfer-university-selector";
import { electricalEngineeringDefaultPathway } from "@/data/electrical-engineering-default-pathway";
import { electricalEngineeringCourses } from "@/data/electrical-engineering-courses";
import { calculateRequirementProgress } from "@/lib/requirement-progress";
import type {
  CourseCategory,
  DefaultPathwaySemester,
  PathwaySlot,
  PlannerCourse,
} from "@/types/course-planner";

const courseCategorySections: {
  category: CourseCategory;
  title: string;
  defaultOpen: boolean;
}[] = [
  {
    category: "general-education",
    title: "General Education",
    defaultOpen: true,
  },
  {
    category: "discipline-general-education",
    title: "Discipline General Education",
    defaultOpen: false,
  },
  {
    category: "mdc-track-requirement",
    title: "MDC Track Requirements",
    defaultOpen: false,
  },
  {
    category: "transfer-core",
    title: "Transfer Core",
    defaultOpen: false,
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

const progressRequirementIds = [
  "communications",
  "mathematics",
  "natural-sciences",
  "pathway-electives",
];

type DrawerView =
  | "engineering-track"
  | "transfer-options"
  | "courses"
  | "choice-courses";

type SelectedChoiceSlot = {
  slot: PathwaySlot;
  semesterId: string;
};

const drawerContent = {
  "engineering-track": {
    title: "Engineering Track",
    description: "Choose the Engineering track for this planner view.",
  },
  "transfer-options": {
    title: "Transfer Options",
    description: "Choose universities and review first-pass transfer summaries.",
  },
  courses: {
    title: "Courses",
    description: "Browse course options and marker legend details.",
  },
  "choice-courses": {
    title: "Choose Course",
    description: "Review eligible courses for the selected pathway choice.",
  },
};

export function EngineeringPlannerShell() {
  const [selectedUniversityIds, setSelectedUniversityIds] = useState<string[]>(
    [],
  );
  const [visibleSemesters, setVisibleSemesters] = useState<
    DefaultPathwaySemester[]
  >(electricalEngineeringDefaultPathway);
  const [selectedChoiceSlot, setSelectedChoiceSlot] =
    useState<SelectedChoiceSlot | null>(null);
  const [activeDrawerView, setActiveDrawerView] =
    useState<DrawerView | null>(null);

  const visibleCourses = useMemo(
    () => getVisiblePathwayCourses(visibleSemesters),
    [visibleSemesters],
  );
  const requirementProgressItems = useMemo(
    () =>
      calculateRequirementProgress(visibleCourses).filter((item) =>
        progressRequirementIds.includes(item.id),
      ),
    [visibleCourses],
  );
  const selectedChoiceCourses = selectedChoiceSlot
    ? getEligibleChoiceCourses(selectedChoiceSlot.slot)
    : [];
  const earlierCourseCodes = selectedChoiceSlot
    ? getEarlierCourseCodes(visibleSemesters, selectedChoiceSlot.semesterId)
    : [];

  function openDrawer(view: DrawerView) {
    setActiveDrawerView(view);
  }

  function restoreDefaultPlan() {
    setVisibleSemesters(electricalEngineeringDefaultPathway);
    setSelectedChoiceSlot(null);
  }

  function clearVisiblePlan() {
    setVisibleSemesters(
      electricalEngineeringDefaultPathway.map((semester) => ({
        ...semester,
        totalCredits: 0,
        slots: [],
      })),
    );
    setSelectedChoiceSlot(null);
  }

  function openChoiceCourses(slot: PathwaySlot, semesterId: string) {
    setSelectedChoiceSlot({ slot, semesterId });
    openDrawer("choice-courses");
  }

  const activeDrawerContent = activeDrawerView
    ? drawerContent[activeDrawerView]
    : drawerContent.courses;

  return (
    <section className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Pathway Canvas
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Static Electrical Engineering planning view.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearVisiblePlan}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Redo
            </button>
            <button
              type="button"
              onClick={restoreDefaultPlan}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Default Plan
            </button>
            <button
              type="button"
              onClick={() => openDrawer("engineering-track")}
              className="rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              Engineering track
            </button>
            <button
              type="button"
              onClick={() => openDrawer("transfer-options")}
              className="rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              Transfer options
            </button>
            <button
              type="button"
              onClick={() => openDrawer("courses")}
              className="rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              Courses
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {requirementProgressItems.map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-950">
                  {item.label}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {item.completedCredits}/{item.requiredCredits}
                </span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-sky-600"
                  style={{
                    width: `${getProgressPercent(
                      item.completedCredits,
                      item.requiredCredits,
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <ElectricalPathwayMap
          semesters={visibleSemesters}
          selectedUniversityIds={selectedUniversityIds}
          onChoiceSlotSelect={openChoiceCourses}
        />
      </div>

      <PlannerSideDrawer
        isOpen={activeDrawerView !== null}
        title={activeDrawerContent.title}
        description={activeDrawerContent.description}
        onClose={() => setActiveDrawerView(null)}
      >
        {activeDrawerView === "engineering-track" ? (
          <EngineeringTrackSelector />
        ) : null}

        {activeDrawerView === "transfer-options" ? (
          <div className="space-y-4">
            <TransferUniversitySelector
              selectedUniversityIds={selectedUniversityIds}
              onSelectedUniversityIdsChange={setSelectedUniversityIds}
            />
            <TransferRequirementSummary
              selectedUniversityIds={selectedUniversityIds}
            />
          </div>
        ) : null}

        {activeDrawerView === "courses" ? (
          <div className="space-y-4">
            <CollapsibleSection
              title="Course Options"
              description="Browse sample Electrical Engineering courses."
              defaultOpen
            >
              <div className="space-y-3">
                {courseCategorySections.map((section) => {
                  const courses = electricalEngineeringCourses.filter(
                    (course) => course.category === section.category,
                  );

                  return (
                    <CollapsibleSection
                      key={section.category}
                      title={section.title}
                      description={`${courses.length} sample courses`}
                      defaultOpen={section.defaultOpen}
                    >
                      <div className="space-y-3">
                        {courses.map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    </CollapsibleSection>
                  );
                })}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Future Course Marker Legend">
              <div className="grid gap-3">
                {legendItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${item.markerClassName}`}
                    />
                    <span className="text-sm text-slate-600">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        ) : null}

        {activeDrawerView === "choice-courses" && selectedChoiceSlot ? (
          <ChoiceCourseSelector
            slot={selectedChoiceSlot.slot}
            eligibleCourses={selectedChoiceCourses}
            earlierCourseCodes={earlierCourseCodes}
          />
        ) : null}
      </PlannerSideDrawer>
    </section>
  );
}

function getVisiblePathwayCourses(semesters: DefaultPathwaySemester[]) {
  const courses: PlannerCourse[] = [];

  for (const semester of semesters) {
    for (const slot of semester.slots) {
      if (slot.type !== "course" || !slot.courseCode) {
        continue;
      }

      const course = electricalEngineeringCourses.find(
        (item) => item.code === slot.courseCode,
      );

      if (course) {
        courses.push(course);
      }
    }
  }

  return courses;
}

function getEligibleChoiceCourses(slot: PathwaySlot) {
  return (slot.eligibleCourseCodes ?? [])
    .map((courseCode) =>
      electricalEngineeringCourses.find((course) => course.code === courseCode),
    )
    .filter((course): course is PlannerCourse => Boolean(course));
}

function getEarlierCourseCodes(
  semesters: DefaultPathwaySemester[],
  selectedSemesterId: string,
) {
  const courseCodes: string[] = [];

  for (const semester of semesters) {
    if (semester.id === selectedSemesterId) {
      break;
    }

    for (const slot of semester.slots) {
      if (slot.type === "course" && slot.courseCode) {
        courseCodes.push(slot.courseCode);
      }
    }
  }

  return courseCodes;
}

function getProgressPercent(completedCredits: number, requiredCredits: number) {
  if (requiredCredits === 0) {
    return 0;
  }

  return Math.min(100, (completedCredits / requiredCredits) * 100);
}

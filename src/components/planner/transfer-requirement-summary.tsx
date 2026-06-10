import { electricalTransferRequirements } from "@/data/electrical-transfer-requirements";
import { electricalTransferUniversities } from "@/data/electrical-transfer-universities";

type TransferRequirementSummaryProps = {
  selectedUniversityIds: string[];
};

export function TransferRequirementSummary({
  selectedUniversityIds,
}: TransferRequirementSummaryProps) {
  const selectedUniversities = electricalTransferUniversities.filter(
    (university) => selectedUniversityIds.includes(university.id),
  );
  const selectedRequirements = electricalTransferRequirements.filter(
    (requirement) => selectedUniversityIds.includes(requirement.universityId),
  );
  const commonRequiredCourses = getCommonRequiredCourses(selectedRequirements);

  if (selectedUniversityIds.length === 0) {
    return (
      <section className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-950">
          Transfer Requirement Summary
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Select one or more transfer universities to compare requirement
          patterns.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-4 rounded-md border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-950">
        Transfer Requirement Summary
      </h3>

      <div className="mt-4 space-y-5">
        <SummaryBlock title="Selected Universities">
          <div className="flex flex-wrap gap-2">
            {selectedUniversities.map((university) => (
              <span
                key={university.id}
                className="rounded bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-700"
              >
                {university.shortName}
              </span>
            ))}
          </div>
        </SummaryBlock>

        <SummaryBlock title="Common Required Courses">
          {commonRequiredCourses.length > 0 ? (
            <CourseCodeList courseCodes={commonRequiredCourses} />
          ) : (
            <p className="text-sm leading-6 text-slate-600">
              No common required courses found across the current selection.
            </p>
          )}
        </SummaryBlock>

        <div className="space-y-4">
          {selectedRequirements.map((requirement) => {
            const university = electricalTransferUniversities.find(
              (item) => item.id === requirement.universityId,
            );

            return (
              <article
                key={requirement.universityId}
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
              >
                <h4 className="text-sm font-semibold text-slate-950">
                  {university?.shortName ?? requirement.universityId}
                </h4>

                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Required
                    </p>
                    <CourseCodeList courseCodes={requirement.requiredCourses} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Recommended
                    </p>
                    {requirement.recommendedCourses.length > 0 ? (
                      <CourseCodeList
                        courseCodes={requirement.recommendedCourses}
                      />
                    ) : (
                      <p className="mt-2 text-sm text-slate-600">
                        No recommended courses added yet.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Notes
                    </p>
                    <ul className="mt-2 space-y-2">
                      {requirement.notes.map((note) => (
                        <li
                          key={note}
                          className="text-sm leading-6 text-slate-600"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function getCommonRequiredCourses(
  requirements: typeof electricalTransferRequirements,
) {
  if (requirements.length === 0) {
    return [];
  }

  return requirements[0].requiredCourses.filter((courseCode) =>
    requirements.every((requirement) =>
      requirement.requiredCourses.includes(courseCode),
    ),
  );
}

function SummaryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function CourseCodeList({ courseCodes }: { courseCodes: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {courseCodes.map((courseCode) => (
        <span
          key={courseCode}
          className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
        >
          {courseCode}
        </span>
      ))}
    </div>
  );
}

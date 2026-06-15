import { generalEducationRequirements } from "@/data/general-education-requirements";
import type { GeneralEducationRequirement, PlannerCourse } from "@/types/course-planner";

export type RequirementProgress = {
  id: string;
  label: string;
  completedCredits: number;
  requiredCredits: number;
};

export function calculateRequirementProgress(
  courses: PlannerCourse[],
): RequirementProgress[] {
  const countedCourseCodes = new Set<string>();

  const progressByRequirement = generalEducationRequirements.map(
    (requirement) => ({
      id: requirement.id,
      label: requirement.name,
      completedCredits: 0,
      requiredCredits: requirement.totalCredits,
    }),
  );

  const regularRequirements = generalEducationRequirements.filter(
    (requirement) => requirement.id !== "general-education-elective",
  );
  const electiveRequirement = generalEducationRequirements.find(
    (requirement) => requirement.id === "general-education-elective",
  );

  for (const requirement of regularRequirements) {
    fillRequirement(requirement, courses, countedCourseCodes, progressByRequirement);
  }

  if (electiveRequirement) {
    fillRequirement(
      electiveRequirement,
      courses,
      countedCourseCodes,
      progressByRequirement,
    );
  }

  return progressByRequirement;
}

function fillRequirement(
  requirement: GeneralEducationRequirement,
  courses: PlannerCourse[],
  countedCourseCodes: Set<string>,
  progressByRequirement: RequirementProgress[],
) {
  const progress = progressByRequirement.find((item) => item.id === requirement.id);

  if (!progress) {
    return;
  }

  const subRequirements = [...requirement.subRequirements].sort(
    (first, second) => first.priority - second.priority,
  );

  for (const subRequirement of subRequirements) {
    let subRequirementCredits = 0;

    for (const course of courses) {
      if (countedCourseCodes.has(course.code)) {
        continue;
      }

      if (!courseMatchesSubRequirement(course, subRequirement.eligibleCourseCodes)) {
        continue;
      }

      const remainingCredits =
        subRequirement.requiredCredits - subRequirementCredits;

      if (remainingCredits <= 0) {
        break;
      }

      const countedCredits = Math.min(course.credits, remainingCredits);
      subRequirementCredits += countedCredits;
      progress.completedCredits += countedCredits;
      countedCourseCodes.add(course.code);
    }
  }
}

function courseMatchesSubRequirement(
  course: PlannerCourse,
  eligibleCourseCodes: string[],
) {
  if (eligibleCourseCodes.length === 0) {
    return course.requirementTags.includes("pathway-elective");
  }

  return eligibleCourseCodes.includes(course.code);
}

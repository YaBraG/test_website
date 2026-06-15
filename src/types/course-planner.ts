export type CourseCategory =
  | "general-education"
  | "discipline-general-education"
  | "mdc-track-requirement"
  | "transfer-core";

export type CourseFlag = "writing-intensive" | "computational";

export type SpecialCourseTag =
  | "transfer-requirement"
  | "default-pathway"
  | "additional-common-prerequisite";

export type CourseSourceStatus =
  | "verified-from-source"
  | "needs-credit-verification"
  | "needs-prerequisite-verification"
  | "pending-confirmation";

export type PlannerCourse = {
  id: string;
  code: string;
  title: string;
  credits: number;
  category: CourseCategory;
  requirementGroup: string;
  isRecommended: boolean;
  recommendationReason: string | null;
  isDualEnrollmentApproved: boolean | null;
  isOfferedAtMdc: boolean | null;
  sourceDocument: string;
  sourceNote: string;
  flags: CourseFlag[];
  prerequisites: string[];
  corequisites: string[];
  requirementTags: string[];
  specialTags: SpecialCourseTag[];
  sourceStatus: CourseSourceStatus;
};

export type RequirementSubRequirement = {
  id: string;
  name: string;
  requiredCredits: number;
  eligibleCourseCodes: string[];
  priority: number;
  notes?: string[];
};

export type GeneralEducationRequirement = {
  id: string;
  name: string;
  totalCredits: number;
  notes?: string[];
  subRequirements: RequirementSubRequirement[];
};

export type PathwaySlotType = "course" | "choice" | "note";

export type PathwaySlot = {
  id: string;
  type: PathwaySlotType;
  label: string;
  credits: number;
  courseCode?: string;
  requirementId?: string;
  subRequirementId?: string;
  eligibleCourseCodes?: string[];
  recommendedCourseCode?: string | null;
  notes?: string[];
  sourceNote: string;
};

export type DefaultPathwaySemester = {
  id: string;
  label: string;
  totalCredits: number;
  slots: PathwaySlot[];
};

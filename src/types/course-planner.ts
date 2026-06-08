export type CourseCategory =
  | "general-education"
  | "discipline-general-education"
  | "mdc-track-requirement"
  | "transfer-core";

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
};

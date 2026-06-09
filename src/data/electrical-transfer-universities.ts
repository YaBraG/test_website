export type TransferUniversityStatus = "available" | "needs-review";

export type TransferUniversity = {
  id: string;
  name: string;
  shortName: string;
  status: TransferUniversityStatus;
  sourceNote: string;
};

export const electricalTransferUniversities: TransferUniversity[] = [
  {
    id: "fiu",
    name: "Florida International University",
    shortName: "FIU",
    status: "available",
    sourceNote: "FIU CPM Electrical 2026-27",
  },
  {
    id: "fau",
    name: "Florida Atlantic University",
    shortName: "FAU",
    status: "available",
    sourceNote: "FAU CPM Electrical 2026-27",
  },
  {
    id: "uf",
    name: "University of Florida",
    shortName: "UF",
    status: "available",
    sourceNote: "UF CPM Electrical 2026-27",
  },
  {
    id: "fsu",
    name: "Florida State University",
    shortName: "FSU",
    status: "available",
    sourceNote: "FSU CPM Electrical 2026-27",
  },
  {
    id: "usf",
    name: "University of South Florida",
    shortName: "USF",
    status: "available",
    sourceNote: "USF CPM Electrical 2026-27",
  },
  {
    id: "ucf",
    name: "University of Central Florida",
    shortName: "UCF",
    status: "needs-review",
    sourceNote: "Found in CPM search results; detailed requirements not uploaded in this batch.",
  },
  {
    id: "unf",
    name: "University of North Florida",
    shortName: "UNF",
    status: "needs-review",
    sourceNote: "Found in CPM search results; detailed requirements not uploaded in this batch.",
  },
  {
    id: "uwf",
    name: "University of West Florida",
    shortName: "UWF",
    status: "needs-review",
    sourceNote: "Found in CPM search results; detailed requirements need review.",
  },
  {
    id: "florida-poly",
    name: "Florida Polytechnic University",
    shortName: "Florida Poly",
    status: "needs-review",
    sourceNote: "Found in CPM search results; detailed requirements need review.",
  },
];

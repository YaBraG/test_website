export type ElectricalTransferRequirement = {
  universityId: string;
  requiredCourses: string[];
  recommendedCourses: string[];
  notes: string[];
};

export const electricalTransferRequirements: ElectricalTransferRequirement[] = [
  {
    universityId: "fiu",
    requiredCourses: [
      "MAC 2311",
      "MAC 2312",
      "MAC 2313",
      "MAP 2302",
      "PHY 2048",
      "PHY 2048L",
      "PHY 2049",
      "PHY 2049L",
      "CHM 1045",
      "CHM 1045L",
    ],
    recommendedCourses: ["COP 2270"],
    notes: [
      "FIU lists chemistry, biology, and engineering chemistry options; this first structure uses the MDC chemistry sample.",
      "Physics and calculus alternates are not modeled yet.",
    ],
  },
  {
    universityId: "fau",
    requiredCourses: ["MAC 2311", "PHY 2048", "PHY 2048L"],
    recommendedCourses: [
      "MAC 2312",
      "MAC 2313",
      "MAP 2302",
      "PHY 2049",
      "PHY 2049L",
    ],
    notes: [
      "FAU identifies Calculus I and Physics I as admission requirements for the major.",
      "Additional listed coursework is treated as recommended for this first comparison shell.",
    ],
  },
  {
    universityId: "uf",
    requiredCourses: [
      "MAC 2311",
      "MAC 2312",
      "MAC 2313",
      "MAP 2302",
      "PHY 2048",
      "PHY 2048L",
      "PHY 2049",
      "PHY 2049L",
    ],
    recommendedCourses: [],
    notes: [
      "UF lists a chemistry or engineering chemistry path, but the exact UF chemistry course codes are not in the current MDC sample.",
      "Physics and calculus alternates are not modeled yet.",
    ],
  },
  {
    universityId: "fsu",
    requiredCourses: [
      "MAC 2311",
      "MAC 2312",
      "MAC 2313",
      "MAP 2302",
      "PHY 2048",
      "PHY 2048L",
      "PHY 2049",
      "PHY 2049L",
      "CHM 1045",
      "CHM 1045L",
    ],
    recommendedCourses: [],
    notes: [
      "FSU includes the MDC chemistry sample as one chemistry path.",
      "Physics and calculus alternates are not modeled yet.",
    ],
  },
  {
    universityId: "usf",
    requiredCourses: [
      "MAC 2311",
      "MAC 2312",
      "MAC 2313",
      "MAP 2302",
      "PHY 2048",
      "PHY 2048L",
      "PHY 2049",
      "PHY 2049L",
    ],
    recommendedCourses: [],
    notes: [
      "USF lists a chemistry or engineering chemistry path, but the exact USF chemistry course codes are not in the current MDC sample.",
      "Physics and calculus alternates are not modeled yet.",
    ],
  },
];

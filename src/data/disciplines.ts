export type DisciplineStatus = "done" | "working" | "unavailable";

export type Discipline = {
  id: string;
  name: string;
  description: string;
  status: DisciplineStatus;
};

export const disciplines: Discipline[] = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Explore design, systems, and problem-solving pathways.",
    status: "working",
  },
  {
    id: "science",
    name: "Science",
    description: "Prepare for study in lab, research, and field sciences.",
    status: "unavailable",
  },
  {
    id: "business",
    name: "Business",
    description: "Plan courses for management, finance, and entrepreneurship.",
    status: "unavailable",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Build a pathway toward programming and computing fields.",
    status: "unavailable",
  },
  {
    id: "education",
    name: "Education",
    description: "Map early steps toward teaching and student support roles.",
    status: "unavailable",
  },
  {
    id: "health-sciences",
    name: "Health Sciences",
    description: "Organize preparation for health and clinical programs.",
    status: "unavailable",
  },
  {
    id: "arts-humanities",
    name: "Arts & Humanities",
    description: "Shape a plan around creative, cultural, and human studies.",
    status: "unavailable",
  },
  {
    id: "criminal-justice",
    name: "Criminal Justice",
    description: "Prepare for coursework in law, safety, and justice systems.",
    status: "unavailable",
  },
];

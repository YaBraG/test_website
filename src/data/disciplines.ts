export type Discipline = {
  id: string;
  name: string;
  description: string;
};

export const disciplines: Discipline[] = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Explore design, systems, and problem-solving pathways.",
  },
  {
    id: "science",
    name: "Science",
    description: "Prepare for study in lab, research, and field sciences.",
  },
  {
    id: "business",
    name: "Business",
    description: "Plan courses for management, finance, and entrepreneurship.",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "Build a pathway toward programming and computing fields.",
  },
  {
    id: "education",
    name: "Education",
    description: "Map early steps toward teaching and student support roles.",
  },
  {
    id: "health-sciences",
    name: "Health Sciences",
    description: "Organize preparation for health and clinical programs.",
  },
  {
    id: "arts-humanities",
    name: "Arts & Humanities",
    description: "Shape a plan around creative, cultural, and human studies.",
  },
  {
    id: "criminal-justice",
    name: "Criminal Justice",
    description: "Prepare for coursework in law, safety, and justice systems.",
  },
];

export type EngineeringTrackStatus = "available" | "working" | "unavailable";

export type EngineeringTrack = {
  id: string;
  name: string;
  description: string;
  status: EngineeringTrackStatus;
  relatedMdcTrack: string;
  transferNotes: string;
};

export const engineeringTracks: EngineeringTrack[] = [
  {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    description: "Builds from the current Electrical Engineering pathway map and course samples.",
    status: "available",
    relatedMdcTrack: "Electrical Engineering",
    transferNotes: "Uses the current Electrical Engineering sample data and pathway map.",
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    description: "Future pathway for mechanics, design, systems, and related transfer preparation.",
    status: "working",
    relatedMdcTrack: "Mechanical Engineering",
    transferNotes: "May later support related transfer paths such as Aerospace Engineering.",
  },
  {
    id: "aerospace-engineering",
    name: "Aerospace Engineering",
    description: "Future transfer-focused option for aerospace preparation.",
    status: "unavailable",
    relatedMdcTrack: "Closest MDC Engineering pathway to be confirmed",
    transferNotes: "May later be mapped through the closest MDC Engineering pathway.",
  },
  {
    id: "computer-engineering",
    name: "Computer Engineering",
    description: "Future pathway for hardware, software, and computing systems preparation.",
    status: "unavailable",
    relatedMdcTrack: "Computer Engineering",
    transferNotes: "Needs source documents before planner data is added.",
  },
  {
    id: "civil-engineering",
    name: "Civil Engineering",
    description: "Future pathway for structures, transportation, construction, and related fields.",
    status: "unavailable",
    relatedMdcTrack: "Civil Engineering",
    transferNotes: "Needs source documents before planner data is added.",
  },
  {
    id: "biomedical-engineering",
    name: "Biomedical Engineering",
    description: "Future pathway for engineering preparation connected to health and biology fields.",
    status: "unavailable",
    relatedMdcTrack: "Closest MDC Engineering pathway to be confirmed",
    transferNotes: "Needs source documents and local pathway mapping before planner data is added.",
  },
];

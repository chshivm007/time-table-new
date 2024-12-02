export const Course = Object.freeze({
  MATHEMATICS: "MATH101",
  SCIENCE: "SCI102",
  ENGLISH: "ENG103",
  HISTORY: "HIST104",
  GEOGRAPHY: "GEO105",
  PHYSICS: "PHYS106",
  CHEMISTRY: "CHEM107",
  BIOLOGY: "BIO108",
  COMPUTER_SCIENCE: "CS109",
  ART: "ART110",
});

export const courses = ref([
  { id: Course.MATHEMATICS, name: "Mathematics" },
  { id: Course.SCIENCE, name: "Science" },
  { id: Course.ENGLISH, name: "English" },
  { id: Course.HISTORY, name: "History" },
  { id: Course.GEOGRAPHY, name: "Geography" },
  { id: Course.PHYSICS, name: "Physics" },
  { id: Course.CHEMISTRY, name: "Chemistry" },
  { id: Course.BIOLOGY, name: "Biology" },
  { id: Course.COMPUTER_SCIENCE, name: "Computer Science" },
  { id: Course.ART, name: "Art" },
]);
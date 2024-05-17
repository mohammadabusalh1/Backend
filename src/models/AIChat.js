module.exports = {
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  Name: "string",
  has_a: {
    type: "relationship",
    target: "AIMessage",
    relationship: "HAS_A",
    direction: "out",
    eager: true,
  },
  for_project: {
    type: "relationship",
    target: "Project",
    relationship: "FOR_PROJECT",
    direction: "out",
    eager: true,
  },
};

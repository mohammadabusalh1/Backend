module.exports = {
  TeamName: "string",
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  TeamRole: "string",
  has_a_task: {
    type: "relationship",
    target: "Task",
    relationship: "HAS_A_TASK",
    direction: "out",
    eager: true,
  },
};

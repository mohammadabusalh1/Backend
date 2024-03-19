module.exports = {
  Title: "string",
  has_task: {
    type: "relationship",
    target: "ProjectNoteTask",
    relationship: "HAS_TASK",
    direction: "out",
    eager: true,
  },
};

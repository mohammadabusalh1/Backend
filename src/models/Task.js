module.exports = {
  TaskName: "string",
  TaskStatus: "string",
  StartDate: "string",
  EndDate: "string",
  Priority: "int",
  Comments: "string",
  IsMarked: {
    type: "boolean",
    default: false,
  },
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  has_a: {
    type: "relationship",
    target: "TaskStep",
    relationship: "HAS_A",
    direction: "out",
    eager: true,
  },
  in_company: {
    type: "relationship",
    target: "Company",
    relationship: "IN_COMPANY",
    direction: "in",
    eager: true,
  },
};

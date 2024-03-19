module.exports = {
  ProjectName: "string",
  ProjectDescription: "string",
  FileName: "string",
  has_note: {
    type: "relationship",
    target: "ProjectNote",
    relationship: "HAS_NOTE",
    direction: "out",
    eager: true,
  },
  has_requirement: {
    type: "relationship",
    target: "ProjectRequirement",
    relationship: "HAS_REQUIREMENT",
    direction: "out",
    eager: true,
  },
};

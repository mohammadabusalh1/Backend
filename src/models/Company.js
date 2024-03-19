module.exports = {
  CompanyName: "string",
  CompanyDescription: "string",
  Rate: {
    type: "float",
    default: 0,
  },
  Domain: "string",
  IsDeleted: {
    type: "boolean",
    default: false,
  },
  CreateDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  has_a_team: {
    type: "relationship",
    target: "Team",
    relationship: "HAS_A_TEAM",
    direction: "out",
    eager: true,
  },
  has_a_comment: {
    type: "relationship",
    target: "Comment",
    relationship: "HAS_A_COMMENT",
    direction: "out",
    eager: true,
  },
  has_a_post: {
    type: "relationship",
    target: "PositionPost",
    relationship: "HAS_A_POST",
    direction: "out",
    eager: true,
  },
  take_a_project: {
    type: "relationship",
    target: "Project",
    relationship: "TAKE_A_PROJECT",
    direction: "out",
    eager: true,
  },
};

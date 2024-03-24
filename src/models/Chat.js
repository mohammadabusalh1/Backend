module.exports = {
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  has_a: {
    type: "relationship",
    target: "Message",
    relationship: "HAS_A",
    direction: "out",
    eager: true,
  },
};

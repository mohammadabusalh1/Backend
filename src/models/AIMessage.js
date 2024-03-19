module.exports = {
  Question: "string",
  Answer: "string",
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
};

module.exports = {
  Content: "string",
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
};

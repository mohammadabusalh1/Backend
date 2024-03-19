module.exports = {
  Message: "string",
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
};

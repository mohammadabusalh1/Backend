module.exports = {
  userId: "int",
  MessageContent: "string",
  CreatedDate: {
    type: "string",
    default: () => new Date().toString(),
  },
  IsDeleted: {
    type: "boolean",
    default: false,
  },
};

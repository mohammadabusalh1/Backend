const Neode = require("neode");

// Import Neode and configure it with your Neo4j connection details
const instance = new Neode(
  process.env.NeodeServerUrl,
  process.env.NeodeUsername,
  process.env.NeodePassword,
  true
);

const dir = __dirname.split("\\");
dir.pop();
dir.push("models");

instance.withDirectory(dir.join("/"));

module.exports = instance;

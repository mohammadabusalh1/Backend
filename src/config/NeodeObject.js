const path = require("path");
const Neode = require("neode");

// Import Neode and configure it with your Neo4j connection details
const instance = new Neode(
  process.env.NeodeServerUrl,
  process.env.NeodeUsername,
  process.env.NeodePassword,
  true
);

// Construct the path to the 'models' directory
const dir = path.join(__dirname, "..", "models");

// Ensure the path is correct
instance.withDirectory(dir);

module.exports = instance;

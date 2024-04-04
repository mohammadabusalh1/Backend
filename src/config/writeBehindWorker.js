/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */
// writeBehindWorker.js
const { createClient } = require("redis"); // Your database connection/model
const NeodeObject = require("./NeodeObject");
const Logging = require("./Logging");
const Backup = require("./Backup");

async function writeBehindWorker(type, cacheType) {
  const client = await createClient({
    url: process.env.Redis_URL,
  })
    .on("error", (err) => Logging.error("Redis Client Error", err))
    .connect();
  while (true) {
    const data = await client.lPop(cacheType);
    if (data) {
      const object = JSON.parse(data);
      await NeodeObject?.create(type, object);
      await Backup.info(
        `CREATE (n:${type} {createdDate: datetime(), ${Object.keys(object)
          ?.map((key) => `${key}: "${object[key]}"`)
          .join(", ")}})
          RETURN n`
      );
    } else {
      // Introduce a 1-second delay using setTimeout
      await new Promise((resolve) => setTimeout(resolve, 900));
    }
  }
}

writeBehindWorker("User", "users");

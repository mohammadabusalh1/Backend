const { createClient } = require("redis");
const Logging = require("./Logging");

async function redisClientGet(key) {
  try {
    const redisClient = await createClient({
      url: process.env.Redis_URL,
    })
      .on("error", (err) => Logging.error("Redis Client Error", err))
      .connect();

    const value = await redisClient.get(key);

    return value;
  } catch (error) {
    Logging.error("Error getting Redis client", error);
    throw error; // Optional: You can choose to handle or rethrow the error
  }
}

async function redisClientSet(key, value) {
  try {
    const redisClient = await createClient({
      url: process.env.Redis_URL,
    })
      .on("error", (err) => Logging.error("Redis Client Error", err))
      .connect();

    await redisClient.set(key, value);

    return value;
  } catch (error) {
    Logging.error("Error getting Redis client", error);
    throw error; // Optional: You can choose to handle or rethrow the error
  }
}

async function redisClientDel(key) {
  try {
    const redisClient = await createClient({
      url: process.env.Redis_URL,
    })
      .on("error", (err) => Logging.error("Redis Client Error", err))
      .connect();

    await redisClient.del(key);

    return true;
  } catch (error) {
    Logging.error("Error getting Redis client", error);
    throw error; // Optional: You can choose to handle or rethrow the error
  }
}

module.exports = { redisClientGet, redisClientSet, redisClientDel };

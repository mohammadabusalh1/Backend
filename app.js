/* eslint-disable no-await-in-loop */
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { typeDefs } = require("./src/schema/schema");
const { resolvers } = require("./src/controllers/resolvers");
const Logging = require("./src/config/Logging");

require("./src/config/writeBehindWorker");

//express-validator

// fixed variable to save this server port, so sever run in this port
const PORT = 4000;
const app = express();

// this to compression data when request and response
app.use(compression());
app.use(cors());
// to save all headers from cross-site injections
app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(limiter);

// app.use((req, res, next) => {
//   if (!req.secure) {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/*
@ this method to start apollo Server and add app as middleware
to add other middleware: compression, because I can't make it without
express server.

@without any parameters and return type.
*/
async function startServer() {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () => {
      Logging.info(`🚀 Server ready at http://localhost:${PORT}`);
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    Logging.error(error);
  }
}

startServer();

module.exports = { app };

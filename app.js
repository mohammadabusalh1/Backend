require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const cors = require("cors");
const { typeDefs } = require("./src/schema/schema");
const { resolvers } = require("./src/controllers/resolvers");
const Logging = require("./src/config/Logging");
require("dotenv").config();

// fixed variable to save this server port, so sever run in this port
const PORT = 3000;

const app = express();

// this to compression data when request and response
app.use(compression());
app.use(cors());

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

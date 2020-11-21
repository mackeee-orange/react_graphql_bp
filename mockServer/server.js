const express = require("express");
const {
  ApolloServer,
  addMockFunctionsToSchema,
  makeExecutableSchema,
} = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const moment = require("moment");
const schemaString = importSchema("mockServer/schema.graphql");

const schema = makeExecutableSchema({ typeDefs: schemaString });
addMockFunctionsToSchema({ schema });

const app = express();

const server = new ApolloServer({
  schema,
  mocks: {
    DateTime: () => {
      return moment();
    },
    Date: () => {
      return moment().format("YYYY-MM-DD");
    },
    HexColor: () => {
      return "de2edd";
    },
  },
  cors: {
    origin: "*",
    credentials: true,
  },
});
server.applyMiddleware({ app });

app.listen({ port: 4000, path: "/graphql" }, () => {
  console.log(`🚀 Server is ready on http://localhost:4000/graphql`);
});


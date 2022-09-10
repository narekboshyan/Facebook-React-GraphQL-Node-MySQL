import { makeExecutableSchema } from "@graphql-tools/schema";
import { DateTimeResolver } from "graphql-scalars";
import { gql } from "apollo-server-express";
import { inputs, types } from "./gql.js";
import { signin } from "./auth/index.js";
import { user } from "./users/index.js";

const typeDefs = gql`
  ${types}
  ${inputs}
  type Query {
    user: Boolean
  }

  type Mutation {
    signin(email: String!, password: String!): JSON
  }

  scalar DateTime
  scalar JSON
  scalar JSONObject
  scalar Upload
`;

const resolvers = {
  Query: { user },
  Mutation: { signin },
  DateTime: DateTimeResolver,
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export { schema, typeDefs, resolvers };

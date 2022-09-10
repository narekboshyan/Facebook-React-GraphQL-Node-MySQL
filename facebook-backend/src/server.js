import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloError } from "apollo-server-errors";
import { schema, resolvers, typeDefs } from "./graphql/schema.js";
import { context } from "./graphql/context.js";
import "./utils/auth.js";
import { SomethingWentWrongError } from "./errors/SomethingWentWrongError.js";
import { ERROR_CODES, ERROR_MESSAGES } from "./constants/errors.js";
import "./env.js";

const app = express();
app.use(express.json());

// ! THis is a way of doing for multiple urls
const allowed = ["http://localhost:3000"];

const options = (req, res) => {
  let tmp;
  let origin = req.header("Origin");
  if (allowed.includes(origin)) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: false,
    };
  }
  res(null, tmp);
};
app.use(cors(options));

// ! This is one way of doing it for single url
// const options = {
//   origin: "http://localhost:3000",
//   optionSuccessStatus: 200,
// };
// app.use(cors(options));

const port = process.env.PORT || 4000;

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    uploads: false,
    schema,
    resolvers,
    typeDefs,
    context,
    plugins: [
      {
        requestDidStart() {
          /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
          return {
            didEncounterErrors(ctx) {
              // If we couldn't parse the operation, don't
              // do anything here
              if (!ctx.operation) {
                return;
              }
              for (const err of ctx.errors) {
                // Only report internal server errors,
                // all errors extending ApolloError should be user-facing

                if (process.env.NODE_ENV === "development") {
                  console.log(err);
                }
              }
            },
          };
        },
      },
    ],
    formatError: (err) => {
      if (process.env.NODE_ENV === "development") {
        console.log(err);
        return err;
      }
      if (
        err.originalError instanceof ApolloError &&
        Object.values(ERROR_CODES).includes(err.extensions.code)
      ) {
        // eslint-disable-next-line
        err.message = err.message.replace("Context creation failed: ", "");
        return err;
      }

      return { message: err.message, status: err.status };
    },
    formatResponse: (res, reqCtx) => {
      if (reqCtx.context.contextError) {
        const {
          message = "",
          extensions = {},
          path = [],
          locations = [],
        } = reqCtx.context.contextError;
        return {
          data: null,
          errors: [{ message, locations, path, extensions }],
        };
      }

      return null;
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port }, async () =>
  console.log(`🚀 Server ready at http://localhost:${port}/graphQL`)
);

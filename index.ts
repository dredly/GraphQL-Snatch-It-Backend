import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import {typeDefs} from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // eslint-disable-next-line @typescript-eslint/require-await
        async serverWillStart() {
          return {
            // eslint-disable-next-line @typescript-eslint/require-await
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

// call the function that does the setup and starts the server
void start();

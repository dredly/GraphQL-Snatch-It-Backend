import { makeExecutableSchema } from '@graphql-tools/schema';
import startLobbyServer from 'gqlobby-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers/resolvers';

const schema = makeExecutableSchema({typeDefs, resolvers});

const DEFAULT_PORT = 4000;
const givenPort = process.env.PORT;
const port = givenPort ? Number(givenPort) : DEFAULT_PORT;

void startLobbyServer({port, schema, lobbyOptions: {minPlayers: 1, maxPlayers: 4}});

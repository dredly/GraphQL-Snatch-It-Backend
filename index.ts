import { makeExecutableSchema } from '@graphql-tools/schema';
import startLobbyServer from 'gqlobby-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers/resolvers';

const schema = makeExecutableSchema({typeDefs, resolvers});

const PORT = 4000;

void startLobbyServer({port: PORT, schema, lobbyOptions: {minPlayers: 1, maxPlayers: 6}});

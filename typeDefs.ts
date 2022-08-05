import { gql } from "apollo-server";

const typeDefs = gql`
  type Player {
    name: String!
    id: ID!
  }
  type Game {
    id: ID!
    started: Boolean!
    players: [Player!]!
  }

  type Query {
    # count queries probably just for testing
    playerCount: Int!
    gameCount: Int!
    allPlayers: [Player!]!
    allGames: [Game!]!
  }

  type Mutation {
    createPlayer(name: String!): Player
    createGame(playerID: ID!): Game
    joinGame(playerID: ID!, gameID: ID!): Game
  }
`;

export {typeDefs};

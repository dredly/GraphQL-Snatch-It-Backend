import { gql } from "apollo-server";

const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    ready: Boolean!
  }
  type Game {
    id: ID!
    started: Boolean!
    players: [Player!]!
    letters: [Letter!]!
  }
  type Letter {
    id: ID!
    value: String!
    exposed: Boolean!
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
    startGame(gameID: ID!): Game
    declareReadiness(playerID: ID!): Player
    flipLetter(gameID: ID!): Letter
  }

  type Subscription {
    gameAdded: Game!
    playerJoined: Game!
  } 
`;

export {typeDefs};

import { gql } from 'apollo-server';

const typeDefs = gql`
  type Letter {
    id: ID!
    value: String!
    rotation: Float!
  }

  type FlippedPositionMapTuple {
    key: String
    value: Int
  }

  type Letters {
    unflipped: [Letter!]!
    flipped: [Letter!]!
    flippedPositions: [FlippedPositionMapTuple!]!
  }

  type Word {
    id: ID!
    letters: [Letter!]!
  }

  type PlayerInGame {
    id: ID!
    name: String!
    ready: Boolean!
    words: [Word!]!
  }

  type GameInProgress {
    id: ID!
    players: [PlayerInGame!]!
    letters: Letters!
  }

  type PlayerScore {
    id: ID!
    score: Int!
  }

  type GameSummary {
    id: ID!
    scoreList: [PlayerScore!]!
  }
  
  type Query {
    allPlayersInGames: [PlayerInGame!]!
    allGamesInProgress: [GameInProgress!]!
    oneGameInProgress(gameID: ID!): GameInProgress 
  }

  input PlayerInput {
    id: ID!
    name: String!
    ready: Boolean!
  }

  input GameInput {
    id: ID!
    players: [PlayerInput!]!
  }

  type Mutation {
    createGameInProgress(game: GameInput!): GameInProgress
    declareReadiness(playerID: ID!): GameInProgress
    writeWord(playerID: ID!, gameID: ID!, word: String!): GameInProgress
    snatchWord(playerID: ID!, gameID: ID!, word: String!, snatchFromID: ID!): GameInProgress
  }

  type Subscription {
    gameInProgressStarted: GameInProgress!
    gameInProgressUpdated: GameInProgress!
    gameInProgressEnded: GameSummary!
  } 
`;

export {typeDefs};

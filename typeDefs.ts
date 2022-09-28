import { gql } from 'apollo-server';

const typeDefs = gql`
  type Letter {
    id: ID!
    value: String!
  }

  type Letters {
    unflipped: [Letter!]!
    flipped: [Letter!]!
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
  
  type Query {
    allPlayersInGames: [PlayerInGame!]!
    allGamesInProgress: [GameInProgress!]!
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
  } 
`;

export {typeDefs};

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

  type Mutation {
    declareReadiness(playerID: ID!): GameInProgress
    flipLetter(gameID: ID!): GameInProgress
    writeWord(playerID: ID!, gameID: ID!, word: String!): GameInProgress
    snatchWord(playerID: ID!, gameID: ID!, word: String!, snatchFromID: ID!): GameInProgress
  }

  type Subscription {
    gameInProgressUpdated: GameInProgress!
  } 
`;

export {typeDefs};

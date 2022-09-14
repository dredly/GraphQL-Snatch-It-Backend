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

  type Player {
    id: ID!
    name: String!
    ready: Boolean!
    words: [Word!]!
  }

  type Game {
    id: ID!
    started: Boolean!
    players: [Player!]!
    letters: Letters!
  }
  
  type Query {
    # count queries probably just for testing
    playerCount: Int!
    gameCount: Int!
    allPlayers: [Player!]!
    allGames: [Game!]!
    gameById(gameID: ID!): Game
  }

  type Mutation {
    createPlayer(name: String!): Player
    createGame(playerID: ID!): Game
    joinGame(playerID: ID!, gameID: ID!): Game
    startGame(gameID: ID!): Game
    declareReadiness(playerID: ID!): Game
    flipLetter(gameID: ID!): Game
    writeWord(playerID: ID!, gameID: ID!, word: String!): Game
    snatchWord(playerID: ID!, gameID: ID!, word: String!, snatchFromID: ID!): Game
  }

  type Subscription {
    gameAdded: Game!
    gameUpdated: Game!
    gameStarted: Game!
  } 
`;

export {typeDefs};

import { v4 as uuidv4 } from "uuid";
import { PubSub } from 'graphql-subscriptions';

interface Player {
  name: string
  id: string
}

interface Game {
  started: boolean
  players: Player[]
  id: string
}

interface State {
  players: Player[]
  games: Game[]
}

const state: State = {
  players: [
    {
      name: "Miguel",
      id: uuidv4(),
    },
    {
      name: "Igor",
      id: uuidv4(),
    },
  ],
  games: [],
};

const pubsub = new PubSub();

const resolvers = {
  Query: {
    playerCount: () => state.players.length,
    gameCount: () => state.games.length,
    allPlayers: () => state.players,
    allGames: () => state.games,
  },
  Mutation: {
    createPlayer: (_root: undefined, args: {name: string}) => {
      const newPlayer = {
        name: args.name,
        id: uuidv4(),
      };
      state.players = state.players.concat(newPlayer);
      return newPlayer;
    },
    createGame: (_root: undefined, args: {playerID: string}) => {
      const creator = state.players.find(
        (p) => p.id.toString() === args.playerID
      );
      if (!creator) {
        throw new Error('Could not find player');
      }
      console.log("creator", creator);
      const newGame: Game = {
        started: false,
        players: [creator],
        id: uuidv4(),
      };
      state.games = state.games.concat(newGame);

      pubsub.publish('GAME_ADDED', {gameAdded: newGame})
        .catch(() => {
          throw new Error('Could not add game');
        });

      return newGame;
    },
    joinGame: (_root: undefined, args: {playerID: string, gameID: string}) => {
      const player = state.players.find(
        (p) => p.id.toString() === args.playerID
      );
      if (!player) {
        throw new Error('Could not find player');
      }
      const game = state.games.find(
        (g) => g.id.toString() === args.gameID
      );
      if (!game) {
        throw new Error('Could not find player');
      }
      game.players = game.players.concat(player);
      return game;
    },
    startGame: (_root: undefined, args: {gameID: string}) => {
      const game = state.games.find(
        (g) => g.id.toString() === args.gameID
      );
      if (!game) {
        throw new Error('Could not find player');
      }
      game.started = true;
      return game;
    }
  },
  Subscription: {
    gameAdded: {
      subscribe: () => pubsub.asyncIterator(['GAME_ADDED'])
    }
  }
};

export {resolvers};

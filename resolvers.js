const { v4: uuidv4 } = require("uuid");

const state = {
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

const resolvers = {
  Query: {
    playerCount: () => state.players.length,
    gameCount: () => state.games.length,
    allPlayers: () => state.players,
    allGames: () => state.games,
  },
  Mutation: {
    createPlayer: (root, args) => {
      const newPlayer = {
        name: args.name,
        id: uuidv4(),
      };
      state.players = state.players.concat(newPlayer);
      return newPlayer;
    },
    createGame: (root, args) => {
      console.log("args", args);
      const creator = state.players.find(
        (p) => p.id.toString() === args.playerID
      );
      console.log("creator", creator);
      const newGame = {
        started: false,
        players: [creator],
        id: uuidv4(),
      };
      state.games = state.games.concat(newGame);
      return newGame;
    },
  },
};

module.exports = resolvers;

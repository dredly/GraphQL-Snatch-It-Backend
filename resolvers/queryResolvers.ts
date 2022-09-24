import { state } from './resolvers';

const queryResolvers = {
	allPlayersInGames: () => state.games.map(g => g.players),
	allGamesInProgress: () => state.games
};

export default queryResolvers;
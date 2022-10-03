import { state } from './resolvers';

const queryResolvers = {
	allPlayersInGames: () => state.games.map(g => g.players),
	allGamesInProgress: () => state.games,
	oneGameInProgress: (_root: undefined, args: {gameID: string}) => {
		console.log('games', state.games);
		console.log('given id', args.gameID);
		console.log('args', args);
		const foundGame = state.games.find(g => g.id === args.gameID);
		if (!foundGame) {
			throw new Error('Could not find that game');
		}
		return foundGame;
	}
};

export default queryResolvers;
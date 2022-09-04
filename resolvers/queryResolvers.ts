import { state } from './resolvers';

const queryResolvers = {
	playerCount: () => state.players.length,
	gameCount: () => state.games.length,
	allPlayers: () => state.players,
	allGames: () => state.games,
	gameById: (_root: undefined, args: {gameID: string}) => {
		console.log('gameID', args.gameID);
		const foundGame = state.games.find(g => g.id === args.gameID);
		if (!foundGame) {
			throw new Error('Could not find game');
		}
		return foundGame;
	}
};

export default queryResolvers;
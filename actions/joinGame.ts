import { State } from '../types';
import { pubsub } from '../resolvers/resolvers';

const joinGameAction = (state: State, playerID: string, gameID: string) => {
	const player = state.players.find(
		(p) => p.id.toString() === playerID
	);
	if (!player) {
		throw new Error('Could not find player');
	}
	const game = state.games.find(
		(g) => g.id.toString() === gameID
	);
	if (!game) {
		throw new Error('Could not find game');
	}
	game.players = game.players.concat(player);

	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});

	return game;
};

export default joinGameAction;
import { State } from '../types';
import { pubsub } from '../resolvers/resolvers';
import handleLetterFlip from '../helpers/handleLetterFlip';

const declareReadinessAction = (state: State, playerID: string) => {
	const player = state.players.find(
		(p) => p.id.toString() === playerID
	);
	if (!player) {
		throw new Error('Could not find player');
	}
	player.ready = !player.ready;

	const game = state.games
		.find(g => g.players.map(p => p.id).includes(player.id));
    
	if (!game) {
		throw new Error('Could not find game');
	}

	game.players = game.players.map(p => (
		p.id === player.id ? player : p
	));

	// Check if players are all ready for a letter to be flipped
	if (game.started && game.players.filter(p => p.ready).length === game.players.length) {
		handleLetterFlip(game);
	}

	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});
	return game;
};

export default declareReadinessAction;
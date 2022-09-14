import { State, Game } from '../types';
import config from '../config';
import handleLetterFlip from '../helpers/handleLetterFlip';
import { pubsub } from '../resolvers/resolvers';

const startGameAction = (state: State, gameID: string): Game => {
	const game = state.games.find(
		(g) => g.id.toString() === gameID
	);
	if (!game) {
		throw new Error('Could not find game');
	}
	game.started = true;
	// Set all players ready value back to false, as it will be reused for declaring
	// readiness to flip letters
	for (const player of game.players) {
		player.ready = false;
	}
	pubsub.publish('GAME_STARTED', {gameStarted: game}).catch(() => {
		throw new Error('Something went wrong');
	});
	const timeoutId = setTimeout(() => {
		console.log('Server automatically flipping letter');
		handleLetterFlip(game);
	}, config.gameRules.roundTimeLimit);
	state.timers.set(game.id, timeoutId);
	return game;
};

export default startGameAction;
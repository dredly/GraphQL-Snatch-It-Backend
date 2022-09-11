import { Game } from '../types';
import { state } from '../resolvers/resolvers';
import config from '../config';
import { pubsub } from '../resolvers/resolvers';

const flipLetterAction = (game: Game) => {
	const randomLetter = game.letters.unflipped[Math.floor(Math.random() * game.letters.unflipped.length)];
	game.letters = {
		unflipped: game.letters.unflipped.filter(ufl => ufl.id !== randomLetter.id),
		flipped: game.letters.flipped.concat(randomLetter)
	};
	if (state.timers.get(game.id)) {
		clearInterval(state.timers.get(game.id));
		state.timers.delete(game.id);
		console.log('Cleared interval');
	}

	// Start the timer again
	const timeoutId = setTimeout(() => {
		console.log('Server automatically flipping letter');
		flipLetterAction(game);
		if (state.timers.get(game.id)) {
			state.timers.delete(game.id);
		}
	}, config.gameRules.roundTimeLimit);
	state.timers.set(game.id, timeoutId);

	for (const player of game.players) {
		player.ready = false;
	}

	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});
};

export default flipLetterAction;
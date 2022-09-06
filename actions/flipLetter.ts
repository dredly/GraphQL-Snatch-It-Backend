import { Game } from '../types';
import { state } from '../resolvers/resolvers';
import config from '../config';
import { pubsub } from '../resolvers/resolvers';

const flipLetter = (game: Game) => {
	const unflipped = game.letters.filter(lett => !lett.exposed);
	const randomLetter = unflipped[Math.floor(Math.random() * unflipped.length)];
	game.letters = game.letters.map(lett => lett.id === randomLetter.id ? { ...lett, exposed: true} : lett);
	if (state.timers.get(game.id)) {
		clearInterval(state.timers.get(game.id));
		state.timers.delete(game.id);
		console.log('Cleared interval');
	}

	// Start the timer again
	const timeoutId = setTimeout(() => {
		console.log('Server automatically flipping letter');
		flipLetter(game);
		if (state.timers.get(game.id)) {
			state.timers.delete(game.id);
		}
	}, config.gameRules.roundTimeLimit);
	state.timers.set(game.id, timeoutId);

	for (const player of game.players) {
		player.ready = false;
	}

	pubsub.publish('LETTER_FLIPPED', {letterFlipped: game}).catch(() => {
		throw new Error('Something went wrong');
	});
};

export default flipLetter;
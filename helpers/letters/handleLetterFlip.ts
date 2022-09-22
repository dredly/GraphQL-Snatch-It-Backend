import { Game } from '../../types';
import config from '../../config';
import { pubsub } from '../../resolvers/resolvers';
import handleLastFlip from './handleLastFlip';

const handleLetterFlip = (game: Game, timers: Map<string, NodeJS.Timeout>) => {
	const randomLetter = game.letters.unflipped[Math.floor(Math.random() * game.letters.unflipped.length)];
	game.letters = {
		unflipped: game.letters.unflipped.filter(ufl => ufl.id !== randomLetter.id),
		flipped: game.letters.flipped.concat(randomLetter)
	};
	if (timers.get(game.id)) {
		clearInterval(timers.get(game.id));
		timers.delete(game.id);
		console.log('Cleared interval');
	}

	// Start the timer again
	const timeoutId = setTimeout(() => {
		console.log('Server automatically flipping letter');
		handleLetterFlip(game, timers);
		if (timers.get(game.id)) {
			timers.delete(game.id);
		}
	}, config.gameRules.roundTimeLimit);
	timers.set(game.id, timeoutId);

	for (const player of game.players) {
		player.ready = false;
	}

	// Check if the letter just flipped was the last one
	if (!game.letters.unflipped.length) {
		handleLastFlip(game);
	}

	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});
};

export default handleLetterFlip;
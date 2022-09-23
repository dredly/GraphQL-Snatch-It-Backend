import cloneDeep from 'lodash.clonedeep';

import { Game } from '../../types';
import config from '../../config';
import handleLastFlip from './handleLastFlip';

const cd = cloneDeep;

const handleLetterFlip = (game: Game, timers: Map<string, NodeJS.Timeout>): Game => {
	const randomLetter = game.letters.unflipped[Math.floor(Math.random() * game.letters.unflipped.length)];
	const updatedLetters = {
		unflipped: game.letters.unflipped.filter(ufl => ufl.id !== randomLetter.id),
		flipped: game.letters.flipped.concat(randomLetter)
	};

	const updatedGame = {
		id: game.id,
		players: game.players.map(p => ({...cd(p), ready: false})),
		letters: updatedLetters
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

	// Check if the letter just flipped was the last one
	if (!game.letters.unflipped.length) {
		handleLastFlip(game);
	}

	return updatedGame;
};

export default handleLetterFlip;
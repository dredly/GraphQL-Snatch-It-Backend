import cloneDeep from 'lodash.clonedeep';

import { State } from '../../types';
import config from '../../config';
import handleLastFlip from './handleLastFlip';
import { pubsub } from '../../resolvers/resolvers';

const cd = cloneDeep;

const handleLetterFlip = (state: State, gameID: string): void => {
	const game = state.games.find(g => g.id === gameID);
	if (!game) {
		throw new Error('Could not find that game');
	}
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

	state.games = state.games.map(g => g.id === gameID ? updatedGame : g);

	void pubsub.publish('GAME_IN_PROGRESS_UPDATED', {gameInProgressUpdated: updatedGame});

	if (state.timers.get(game.id)) {
		clearInterval(state.timers.get(game.id));
		state.timers.delete(game.id);
		console.log('Cleared interval');
	}

	// Start the timer again
	const timeoutId = setTimeout(() => {
		console.log('Server automatically flipping letter');
		handleLetterFlip(state, gameID);
		if (state.timers.get(game.id)) {
			state.timers.delete(game.id);
		}
	}, config.gameRules.roundTimeLimit);
	state.timers.set(game.id, timeoutId);

	// Check if the letter just flipped was the last one
	if (!game.letters.unflipped.length) {
		handleLastFlip(game);
	}
};

export default handleLetterFlip;
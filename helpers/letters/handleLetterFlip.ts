import cloneDeep from 'lodash.clonedeep';

import { State } from '../../types';
import config from '../../config';
import handleLastFlip from './handleLastFlip';
import { pubsub } from '../../resolvers/resolvers';
import { allLetters } from '../../letters';
import { setDifference, selectRandomElement } from '../collectionUtils';

const cd = cloneDeep;

const updateFlippedPositions = (currentFlippedPositions: Map<string, number>, totalNumOfLetters: number, flippedLetterId: string) => {
	const flippedPositions = cd(currentFlippedPositions);

	const availablePositions = setDifference(
		new Set([...Array(totalNumOfLetters).keys()]), // all positions
		new Set(flippedPositions.values())      // taken positions
	);

	flippedPositions.set(flippedLetterId, selectRandomElement(availablePositions));
	return flippedPositions;
};

const handleLetterFlip = (state: State, gameID: string): void => {
	const totalNumOfLetters = allLetters.length;

	const game = state.games.find(g => g.id === gameID);
	if (!game) {
		throw new Error('Could not find that game');
	}
	const randomLetter = game.letters.unflipped[Math.floor(Math.random() * game.letters.unflipped.length)];

	const updatedLetters = {
		unflipped: game.letters.unflipped.filter(ufl => ufl.id !== randomLetter.id),
		flipped: game.letters.flipped.concat(randomLetter),
		flippedPositions: updateFlippedPositions(game.letters.flippedPositions, totalNumOfLetters, randomLetter.id)
	};

	const updatedGame = {
		id: game.id,
		players: game.players.map(p => ({...cd(p), ready: false})),
		letters: updatedLetters
	};

	state.games = state.games.map(g => g.id === gameID ? updatedGame : g);

	// Introduce slight delay to publishing the game updated so that client can handle consecutive messages
	setTimeout(() => {
		void pubsub.publish('GAME_IN_PROGRESS_UPDATED', {gameInProgressUpdated: updatedGame});
	}, 100);
	
	if (state.timers.get(game.id)) {
		clearInterval(state.timers.get(game.id));
		state.timers.delete(game.id);
		console.log('Cleared interval');
	}

	// Check if the letter just flipped was the last one
	if (!game.letters.unflipped.length) {
		handleLastFlip(game);
		state.timers.delete(game.id);
		return;
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
};

export default handleLetterFlip;
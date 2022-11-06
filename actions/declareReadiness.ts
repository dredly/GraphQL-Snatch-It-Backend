import cloneDeep from 'lodash.clonedeep';
import every from 'lodash.every';
import { pubsub } from '../resolvers/resolvers';

import { State } from '../types';

const cd = cloneDeep;

// Dependency injecting the handleLetterFlip function to make testing easier
const declareReadinessAction = (
	state: State, 
	playerID: string, 
	handleLetterFlip: (state: State, gameID: string) => void
) => {
	console.log(`Player with id ${playerID} has declared readiness to flip`);
	const game = state.games.find(g => g.players.map(p => p.id).includes(playerID));
	if (!game) {
		throw new Error('A game containing that player was not found');
	}

	const updatedGame = {
		...cd(game),
		players: game.players.map(p => (
			p.id === playerID 
				? { ...p, ready: !p.ready}
				: p
		))
	};

	state.games = state.games.map(g => g.id === updatedGame.id ? updatedGame: g);

	// Flip over a letter if all the players are ready
	if (every(updatedGame.players.map(p => p.ready))) {
		handleLetterFlip(state, game.id);
	}

	void pubsub.publish('GAME_IN_PROGRESS_UPDATED', {gameInProgressUpdated: updatedGame});

	// This will return the game before a letter has been flipped, 
	// but should be OK as a pubsub with the flipped letter result will be sent out separately
	return updatedGame;
};

export default declareReadinessAction;
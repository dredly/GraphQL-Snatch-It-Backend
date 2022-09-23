import cloneDeep from 'lodash.clonedeep';
import every from 'lodash.every';

import { State, Game } from '../types';

const cd = cloneDeep;

// Dependency injecting the handleLetterFlip function to make testing easier
const declareReadinessAction = (state: State, playerID: string, handleLetterFlip: (game: Game, timers: Map<string, NodeJS.Timeout>) => Game) => {
	const game = state.games.find(g => g.players.map(p => p.id).includes(playerID));
	if (!game) {
		throw new Error('A game containing that player was not found');
	}

	const partiallyUpdatedGame = {
		...cd(game),
		players: game.players.map(p => (
			p.id === playerID 
				? { ...p, ready: !p.ready}
				: p
		))
	};

	// Flip over a letter if all the players are ready
	const updatedGame = every(partiallyUpdatedGame.players.map(p => p.ready))
		? handleLetterFlip(partiallyUpdatedGame, state.timers)
		: partiallyUpdatedGame;

	state.games = state.games.map(g => g.id === updatedGame.id ? updatedGame: g);

	return updatedGame;
};

export default declareReadinessAction;
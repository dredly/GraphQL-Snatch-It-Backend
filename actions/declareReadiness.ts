import cloneDeep from 'lodash.clonedeep';

import { State } from '../types';

const cd = cloneDeep;

const declareReadinessAction = (state: State, playerID: string) => {
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

	return updatedGame;
};

export default declareReadinessAction;
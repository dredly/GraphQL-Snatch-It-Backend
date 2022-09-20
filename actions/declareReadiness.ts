import { State } from '../types';

const declareReadinessAction = (state: State, playerID: string) => {
	const game = state.games.find(g => g.players.map(p => p.id).includes(playerID));
	if (!game) {
		throw new Error('A game containing that player was not found');
	}

	return game;
};

export default declareReadinessAction;
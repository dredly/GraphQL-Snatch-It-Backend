import cloneDeep from 'lodash.clonedeep';

import snatchWordAction from '../../actions/snatchWord';
import { testState2 } from '../testData';

const cd = cloneDeep;

describe('snatchWordAction', () => {
	it('Modifies state and returns updated game as expected when called with valid input', () => {
		const state = cd(testState2);
		const updatedGame = snatchWordAction(state, '2', '1', 'path', '2');
		expect(updatedGame.players[2].words).toHaveLength(2);
		expect(updatedGame.players[1].words).toHaveLength(0);
		expect(updatedGame.letters.flipped).toHaveLength(3);

		expect(state.games).toEqual(
			cd(testState2).games.map(g => g.id === updatedGame.id ? updatedGame : g)
		);
	});

	it('Throws an error if called with invalid playerID or gameID', () => {
		expect(() => snatchWordAction(cd(testState2), '2', '100', 'path', '2')).toThrowError(
			'Could not find game'
		);
		expect(() => snatchWordAction(cd(testState2), '100', '1', 'path', '2')).toThrowError(
			'Could not find player'
		);
	});
});
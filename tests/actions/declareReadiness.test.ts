import cloneDeep from 'lodash.clonedeep';

import declareReadinessAction from '../../actions/declareReadiness';
import { testState1 } from '../testData';

const cd = cloneDeep;

describe('declareReadinessAction', () => {
	it('Modifies state and returns updated game as expected when called with valid input', () => {
		const state = cd(testState1);
		const updatedGame = declareReadinessAction(state, '2');
		expect(updatedGame).toEqual({
			...cd(testState1).games[0],
			players: cd(testState1).games[0].players.map(p => p.id === '2' ? { ...p, ready: true } : p)
		});
		expect(state.games).toEqual(
			cd(testState1).games.map(g => g.id === updatedGame.id ? updatedGame : g)
		);
	});
});
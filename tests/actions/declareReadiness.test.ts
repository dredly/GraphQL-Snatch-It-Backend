import cloneDeep from 'lodash.clonedeep';

import declareReadinessAction from '../../actions/declareReadiness';
import handleLetterFlip from '../../helpers/letters/handleLetterFlip';
import { testState1, testState3 } from '../testData';

const cd = cloneDeep;

const mockLetterFlip = jest.fn(handleLetterFlip);

describe('declareReadinessAction', () => {
	it('Modifies state and returns updated game as expected when called with valid input', () => {
		const state = cd(testState1);
		const updatedGame = declareReadinessAction(state, '2', mockLetterFlip);
		expect(updatedGame).toEqual({
			...cd(testState1).games[0],
			players: cd(testState1).games[0].players.map(p => p.id === '2' ? { ...p, ready: true } : p)
		});
		expect(state.games).toEqual(
			cd(testState1).games.map(g => g.id === updatedGame.id ? updatedGame : g)
		);

		// letter should not be flipped as not all players ready yet
		expect(mockLetterFlip).toBeCalledTimes(0);
	});

	it('Throws an error when called with an invalid playerID', () => {
		expect(() => declareReadinessAction(cd(testState1), '528', mockLetterFlip)).toThrowError('A game containing that player was not found');
	});

	it('Calls the handleLetterFlip function when called with valid input and all players in the game are ready', () => {
		const state = cd(testState3);
		const updatedGame = declareReadinessAction(state, '3', mockLetterFlip);

		expect(mockLetterFlip).toBeCalledTimes(1);

		clearInterval(state.timers.get(updatedGame.id) as string);
	});
});
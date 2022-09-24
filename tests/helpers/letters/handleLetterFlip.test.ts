import cloneDeep from 'lodash.clonedeep';

import { testState3 } from '../../testData';
import handleLetterFlip from '../../../helpers/letters/handleLetterFlip';

const cd = cloneDeep;

describe('handleLetterFlip function', () => {
	it('Correctly updates the state when called with valid input', () => {
		const state = cd(testState3);
		handleLetterFlip(state, '1');
		const originalGame = testState3.games[0];
		const updatedGame = state.games[0];
		expect(updatedGame.letters.flipped)
			.toHaveLength(originalGame.letters.flipped.length + 1);
		expect(updatedGame.letters.unflipped)
			.toHaveLength(originalGame.letters.unflipped.length - 1);
		expect(updatedGame.players.filter(p => !p.ready)).toHaveLength(updatedGame.players.length);

		expect(state.timers.size).toBe(1);
		clearInterval(state.timers.get(originalGame.id) as string);
	});

	it('Throws an error when given an invalid gameID', () => {
		const state = cd(testState3);
		expect(() => handleLetterFlip(state, '5')).toThrowError('Could not find that game');
	});

	it('Deletes the previous timerId before creating a new one if there is already a timer running', () => {
		const state = cd(testState3);
		const originalGame = testState3.games[0];
		const fakeTimeout = setInterval(() => {
			console.log('Fake');
		}, 20000);
		state.timers.set(originalGame.id, fakeTimeout);

		handleLetterFlip(state, '1');

		expect(state.timers.size).toBe(1);
		clearInterval(state.timers.get(originalGame.id) as string);
	});
});
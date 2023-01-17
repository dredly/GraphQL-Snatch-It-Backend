import cloneDeep from 'lodash.clonedeep';

import writeWordAction from '../../actions/writeWord';
import { testState1 } from '../testData';

const cd = cloneDeep;

describe('writeWordAction', () => {
	it('Modifies state and returns updated game as expected when called with valid input', () => {
		const state = cd(testState1);
		const updatedGame = writeWordAction(state, '4', '2', 'tab');
		expect(updatedGame.players[1].words).toHaveLength(1);
		expect(updatedGame.players[1].words[0].letters).toHaveLength(3);
		expect(updatedGame.letters.flipped).toHaveLength(2);
		expect(updatedGame.letters.flipped.map(lett => lett.value)).toEqual(['S', 'E']);

		expect(state.games).toEqual(
			cd(testState1).games.map(g => g.id === updatedGame.id ? updatedGame : g)
		);
	});

	it('Sets rotations to 0 for all letters when a word is written', () => {
		const state = cd(testState1);
		const updatedGame = writeWordAction(state, '4', '2', 'tab');
		const writtenWord = updatedGame.players[1].words[0];
		const writtenWordRotations = writtenWord.letters.map(lett => lett.rotation);
		expect(writtenWordRotations).toEqual([0, 0, 0]);
	});

	it('Throws an error when given an invalid gameID or playerID', () => {
		expect(() => writeWordAction(cd(testState1), '4', 'falsy', 'bat')).toThrowError(
			'Could not find game'
		);

		expect(() => writeWordAction(cd(testState1), 'falsy', '2', 'bat')).toThrowError(
			'Could not find player'
		);
	});
});
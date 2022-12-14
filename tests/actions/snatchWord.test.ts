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

	it('Modifies state and returns update game as expected when a player snatches their own word', () => {
		const state = cd(testState2);
		const updatedGame = snatchWordAction(state, '1', '1', 'path', '2');
		expect(updatedGame.players[2].words).toHaveLength(1);
		expect(updatedGame.players[1].words).toHaveLength(1);
		expect(updatedGame.letters.flipped).toHaveLength(3);

		expect(state.games).toEqual(
			cd(testState2).games.map(g => g.id === updatedGame.id ? updatedGame : g)
		);
	});

	it('Allows a player to snatch a word which has already been snatched', () => {
		const state = cd(testState2);
		snatchWordAction(state, '0', '1', 'spat', '2');
		const afterSecondSnatch = snatchWordAction(state, '1', '1', 'pathos', '2');
		expect(afterSecondSnatch.players[0].words).toHaveLength(1);
		expect(afterSecondSnatch.players[1].words).toHaveLength(1);
		expect(afterSecondSnatch.letters.flipped).toHaveLength(1);

		expect(state.games).toEqual(
			cd(testState2).games.map(g => g.id === afterSecondSnatch.id ? afterSecondSnatch : g)
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
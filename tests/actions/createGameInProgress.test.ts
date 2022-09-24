import { Game as LobbyGame } from 'gqlobby-server/lib/types';

import { State } from '../../types';
import createGameInProgressAction from '../../actions/createGameInProgress';
import { allLetters, generateLetters } from '../../letters';
import handleLetterFlip from '../../helpers/letters/handleLetterFlip';

const testState: State = {
	games: [],
	timers: new Map()
};

const testLobbyGame: LobbyGame = {
	id: '1',
	status: 'IN_PROGRESS',
	players: [
		{ id: '1', name: 'Miguel', ready: true },
		{ id: '2', name: 'Igor', ready: true }
	]
};

const generateAllLetters = jest.fn(() => generateLetters(allLetters));
const mockLetterFlip = jest.fn(handleLetterFlip);

describe('createGameInProgressAction function', () => {
	it('Creates a new game and adds it to the state as expected', () => {
		const newGame = createGameInProgressAction(testState, testLobbyGame, generateAllLetters, mockLetterFlip);
		expect(newGame.id).toEqual(testLobbyGame.id);
		expect(newGame.players).toEqual(
			testLobbyGame.players.map(p => ({id: p.id, ready: false, name: p.name, words: []}))
		);
		expect(newGame.letters.flipped).toHaveLength(0);
		expect(newGame.letters.unflipped).toHaveLength(allLetters.length);

		expect(testState.games).toEqual([newGame]);

		expect(testState.timers.size).toBe(1);

		clearInterval(testState.timers.get(newGame.id));
	});
});
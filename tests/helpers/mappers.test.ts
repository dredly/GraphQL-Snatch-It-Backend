import { gameToPublishedGame } from '../../helpers/mappers';
import { Game, PublishedGame } from '../../types';
import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

const testGame: Game = {
	players: [],
	id: '1',
	letters: {
		flipped: [],
		unflipped: [],
		flippedPositions: new Map([
			['2', 2],
			['3', 3],
			['5', 100]
		])
	}
};

const testGame2: Game = { 
	...cd(testGame),
	letters: {
		...testGame.letters,
		flippedPositions: new Map()
	}
};

const expectedPublishedGame: PublishedGame = {
	players: [],
	id: '1',
	letters: {
		flipped: [],
		unflipped: [],
		flippedPositions: [
			{ key: '2', value: 2 },
			{ key: '3', value: 3 },
			{ key: '5', value: 100 },
		]
	}
};

const expectedPublishedGame2: PublishedGame = {
	players: [],
	id: '1',
	letters: {
		flipped: [],
		unflipped: [],
		flippedPositions: []
	}
};

describe('gameToPublishedGame function', () => {
	it('Correctly maps for a populated flippedLetterPositions Map', () => {
		expect(gameToPublishedGame(testGame)).toEqual(expectedPublishedGame);
	});
	it('Correctly maps for an empty flippedLetterPositions Map', () => {
		expect(gameToPublishedGame(testGame2)).toEqual(expectedPublishedGame2);
	});
});
import findWordById from '../../../helpers/finders/findWordById';

import { Word, Player, Game } from '../../../types';

const testWord: Word = {
	id: '1',
	letters: [
		{id: '1', value: 'T', rotation: 0},
		{id: '2', value: 'R', rotation: 0},
		{id: '3', value: 'O', rotation: 0},
		{id: '4', value: 'G', rotation: 0},
		{id: '5', value: 'D', rotation: 0},
		{id: '6', value: 'O', rotation: 0},
		{id: '7', value: 'R', rotation: 0},
	]
};

const testWord2: Word = {
	id: '2',
	letters: [
		{id: '8', value: 'P', rotation: 0},
		{id: '9', value: 'A', rotation: 0},
		{id: '10', value: 'T', rotation: 0},
	]
};

const testWord3: Word = {
	id: '3',
	letters: [
		{id: '11', value: 'S', rotation: 0},
		{id: '12', value: 'P', rotation: 0},
		{id: '13', value: 'I', rotation: 0},
		{id: '14', value: 'T', rotation: 0},
		{id: '15', value: 'E', rotation: 0},
	]
};

const testPlayer1: Player = {
	id: '1',
	name: 'Miguel',
	ready: true,
	words: [testWord, testWord2]
};

const testPlayer2: Player = {
	id: '2',
	name: 'Miguelito',
	ready: true,
	words: [testWord3]
};

const testGame: Game = {
	id: '1',
	players: [testPlayer1, testPlayer2],
	letters: {
		flipped: [],
		unflipped: []
	}
};

test('findWordByIdAction function', () => {
	expect(findWordById(testGame.players, '1')).toEqual(testWord);
	expect(findWordById(testGame.players, '3')).toEqual(testWord3);
	expect(() => findWordById(testGame.players, '4')).toThrowError();
});
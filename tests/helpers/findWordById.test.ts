import findWordByIdAction from '../../helpers/findWordById';

import { Word, Player, Game } from '../../types';

const testWord: Word = {
	id: '1',
	letters: [
		{id: '1', value: 'T'},
		{id: '2', value: 'R'},
		{id: '3', value: 'O'},
		{id: '4', value: 'G'},
		{id: '5', value: 'D'},
		{id: '6', value: 'O'},
		{id: '7', value: 'R'},
	]
};

const testWord2: Word = {
	id: '2',
	letters: [
		{id: '8', value: 'P'},
		{id: '9', value: 'A'},
		{id: '10', value: 'T'},
	]
};

const testWord3: Word = {
	id: '3',
	letters: [
		{id: '11', value: 'S'},
		{id: '12', value: 'P'},
		{id: '13', value: 'I'},
		{id: '14', value: 'T'},
		{id: '15', value: 'E'},
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
	started: true,
	players: [testPlayer1, testPlayer2],
	letters: {
		flipped: [],
		unflipped: []
	}
};

test('findWordByIdAction function', () => {
	expect(findWordByIdAction(testGame.players, '1')).toEqual(testWord);
	expect(findWordByIdAction(testGame.players, '3')).toEqual(testWord3);
	expect(() => findWordByIdAction(testGame.players, '4')).toThrowError();
});
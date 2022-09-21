import { State, Game, Player, Word } from '../types';

const generatePlayers = (numPlayers: number): Player[] => {
	return Array.from({length: numPlayers}).map((_, idx) => {
		return {
			id: idx.toString(),
			name: `Player ${idx}`,
			words: [],
			ready: false
		};
	});
};

const tenPlayers = generatePlayers(10);

const testLetterArray = [
	{id: '1', value: 'B'},
	{id: '2', value: 'A'},
	{id: '3', value: 'S'},
	{id: '4', value: 'T'},
	{id: '5', value: 'E'},
];

const testGame1: Game = {
	id: '1',
	players: tenPlayers.slice(0, 3),
	letters: {
		unflipped: [],
		flipped: []
	}
}; 

const testGame2: Game = {
	id: '2',
	players: tenPlayers.slice(3, 5),
	letters: {
		unflipped: [],
		flipped: testLetterArray
	}
}; 

export const testState1: State = {
	games: [
		testGame1,
		testGame2
	],
	timers: new Map()
};

const testWord1: Word = {
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

const generatePlayersWithWordEach = (words: Word[]): Player[] => {
	return words.map((w, idx) => {
		return {
			id: idx.toString(),
			name: `Player ${idx}`,
			words: [w],
			ready: false
		};
	});
};

const threePlayersWithWords = generatePlayersWithWordEach([
	testWord1,
	testWord2,
	testWord3
]);

const testLetterArray2 = [
	{id: '16', value: 'T'},
	{id: '17', value: 'H'},
	{id: '18', value: 'S'},
	{id: '19', value: 'O'},
];

export const testState2: State = {
	games: [
		{
			id: '1',
			players: threePlayersWithWords,
			letters: {
				unflipped: [],
				flipped: testLetterArray2
			}
		}
	],
	timers: new Map()
};
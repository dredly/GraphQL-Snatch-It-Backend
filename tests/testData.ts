import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

import { State, Game, Player, Word, Letter } from '../types';

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

export const testLetterPool: Letter[] = [
	{id: '1', value: 'A'},
	{id: '2', value: 'B'},
	{id: '3', value: 'C'},
	{id: '4', value: 'D'},
	{id: '5', value: 'E'},
	{id: '6', value: 'F'},
	{id: '7', value: 'F'},
	{id: '8', value: 'R'},
	{id: '9', value: 'I'}
];

const testLetters = {
	flipped: [
		{id: '1', value: 'A'},
		{id: '2', value: 'B'},
		{id: '3', value: 'C'},
		{id: '4', value: 'D'},
	],
	unflipped: [
		{id: '5', value: 'E'},
		{id: '6', value: 'F'},
	]
};

export const testGame = {
	id: '1',
	players: tenPlayers.slice(0, 3).map(p => ({...cd(p), ready: true})),
	letters: testLetters
};

export const testState3 = {
	games: [
		{
			id: '1',
			players: tenPlayers
				.slice(0, 3).map(p => ({...cd(p), ready: true}))
				.concat(tenPlayers[3]),
			letters: testLetters
		}
	],
	timers: new Map()
};

export const threePlayersTwoWordsEach: Player[] = [
	{
		name: 'P1',
		id: 'p1',
		ready: false,
		words: [
			{
				id: 'w1',
				letters: [
					{id: 'l1', value: 'B'},
					{id: 'l2', value: 'E'},
					{id: 'l3', value: 'D'},
				]
			},
			{
				id: 'w2',
				letters: [
					{id: 'l4', value: 'S'},
					{id: 'l5', value: 'P'},
					{id: 'l6', value: 'A'},
					{id: 'l7', value: 'T'},
				]
			}
		]
	},
	{
		name: 'P2',
		id: 'p2',
		ready: false,
		words: [
			{
				id: 'w3',
				letters: [
					{id: 'l8', value: 'T'},
					{id: 'l9', value: 'O'},
				]
			},
			{
				id: 'w4',
				letters: [
					{id: 'l10', value: 'I'},
					{id: 'l11', value: 'N'},
				]
			}
		]
	},
	{
		name: 'P3',
		id: 'p3',
		ready: false,
		words: [
			{
				id: 'w5',
				letters: [
					{id: 'l12', value: 'S'},
					{id: 'l13', value: 'P'},
					{id: 'l14', value: 'I'},
					{id: 'l15', value: 'C'},
					{id: 'l16', value: 'E'},
				]
			},
			{
				id: 'w6',
				letters: [
					{id: 'l17', value: 'A'},
					{id: 'l18', value: 'L'},
					{id: 'l19', value: 'B'},
					{id: 'l20', value: 'A'},
					{id: 'l21', value: 'T'},
					{id: 'l22', value: 'R'},
					{id: 'l23', value: 'O'},
					{id: 'l24', value: 'S'},
					{id: 'l25', value: 'S'},
				]
			}
		]
	}
];
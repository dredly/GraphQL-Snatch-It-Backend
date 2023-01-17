import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

import { State, Game, Player, Word, Letter, Letters } from '../types';

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

const testLetterArray: Letter[] = [
	{id: '1', value: 'B', rotation: 0.3},
	{id: '2', value: 'A', rotation: 0.6},
	{id: '3', value: 'S', rotation: 0.1},
	{id: '4', value: 'T', rotation: 0.9},
	{id: '5', value: 'E', rotation: 0.5},
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

const testLetterArray2: Letter[] = [
	{id: '16', value: 'T', rotation: 0},
	{id: '17', value: 'H', rotation: 0},
	{id: '18', value: 'S', rotation: 0},
	{id: '19', value: 'O', rotation: 0},
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
	{id: '1', value: 'A', rotation: 0},
	{id: '2', value: 'B', rotation: 0},
	{id: '3', value: 'C', rotation: 0},
	{id: '4', value: 'D', rotation: 0},
	{id: '5', value: 'E', rotation: 0},
	{id: '6', value: 'F', rotation: 0},
	{id: '7', value: 'F', rotation: 0},
	{id: '8', value: 'R', rotation: 0},
	{id: '9', value: 'I', rotation: 0}
];

const testLetters: Letters = {
	flipped: [
		{id: '1', value: 'A', rotation: 0},
		{id: '2', value: 'B', rotation: 0},
		{id: '3', value: 'C', rotation: 0},
		{id: '4', value: 'D', rotation: 0},
	],
	unflipped: [
		{id: '5', value: 'E', rotation: 0},
		{id: '6', value: 'F', rotation: 0},
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
					{id: 'l1', value: 'B', rotation: 0},
					{id: 'l2', value: 'E', rotation: 0},
					{id: 'l3', value: 'D', rotation: 0},
				]
			},
			{
				id: 'w2',
				letters: [
					{id: 'l4', value: 'S', rotation: 0},
					{id: 'l5', value: 'P', rotation: 0},
					{id: 'l6', value: 'A', rotation: 0},
					{id: 'l7', value: 'T', rotation: 0},
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
					{id: 'l8', value: 'T', rotation: 0},
					{id: 'l9', value: 'O', rotation: 0},
				]
			},
			{
				id: 'w4',
				letters: [
					{id: 'l10', value: 'I', rotation: 0},
					{id: 'l11', value: 'N', rotation: 0},
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
					{id: 'l12', value: 'S', rotation: 0},
					{id: 'l13', value: 'P', rotation: 0},
					{id: 'l14', value: 'I', rotation: 0},
					{id: 'l15', value: 'C', rotation: 0},
					{id: 'l16', value: 'E', rotation: 0},
				]
			},
			{
				id: 'w6',
				letters: [
					{id: 'l17', value: 'A', rotation: 0},
					{id: 'l18', value: 'L', rotation: 0},
					{id: 'l19', value: 'B', rotation: 0},
					{id: 'l20', value: 'A', rotation: 0},
					{id: 'l21', value: 'T', rotation: 0},
					{id: 'l22', value: 'R', rotation: 0},
					{id: 'l23', value: 'O', rotation: 0},
					{id: 'l24', value: 'S', rotation: 0},
					{id: 'l25', value: 'S', rotation: 0},
				]
			}
		]
	}
];
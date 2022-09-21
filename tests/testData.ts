import { State, Game, Player } from '../types';

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
		flipped: []
	}
}; 

export const testState1: State = {
	games: [
		testGame1,
		testGame2
	],
	timers: new Map()
};

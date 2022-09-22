import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';

import { Game, State, Word } from '../types';
import getLettersForWord from '../helpers/letters/getLettersForWord';

const cd = cloneDeep;

const writeWordAction = (state: State, playerID: string, gameID: string, word: string) => {
	const game = state.games.find(
		(g) => g.id.toString() === gameID
	);
	if (!game) {
		throw new Error('Could not find game');
	}
	const player = game.players.find(p => p.id === playerID);
	if (!player) {
		throw new Error('Could not find player');
	}
	const { letters, remaining } = getLettersForWord(word, game.letters.flipped);
	const newWord: Word = {
		id: uuidv4(),
		letters
	};

	const updatedGame: Game = {
		...cd(game),
		players: game.players.map(p => (
			p.id === playerID
				? { ...p, words: p.words.concat(newWord)}
				: p
		)),
		letters: { ...game.letters, flipped: remaining }
	};

	state.games = state.games.map(g => g.id === updatedGame.id ? updatedGame: g);

	return updatedGame;
};

export default writeWordAction;
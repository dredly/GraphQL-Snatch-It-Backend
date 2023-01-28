import cloneDeep from 'lodash.clonedeep';

import { State, Word, Game } from '../types';
import findWordById from '../helpers/finders/findWordById';
import findPlayerByWordId from '../helpers/finders/findPlayerByWordId';
import snatchLetters from '../helpers/letters/snatchLetters';
import { pubsub } from '../resolvers/resolvers';
import { updateFlippedPositions } from './writeWord';
import { gameToPublishedGame } from '../helpers/mappers';

const cd = cloneDeep;

const snatchWordAction = (state: State, playerID: string, gameID: string, word: string, snatchFromID: string) => {
	const game = state.games.find(
		(g) => g.id === gameID
	);
	if (!game) {
		throw new Error('Could not find game');
	}
	const player = game.players.find(p => p.id === playerID);
	if (!player) {
		throw new Error('Could not find player');
	}
	const snatchFrom: Word = findWordById(game.players, snatchFromID);
	const playerLosingWord = findPlayerByWordId(game.players, snatchFromID);
	const { letters, remaining } = snatchLetters(word, game.letters.flipped, snatchFrom);
	const newWord: Word = {
		id: snatchFrom.id,
		letters
	};

	const updatedGame: Game = {
		...cd(game),
		players: game.players
			.map(p => p.id === playerLosingWord.id ? { ...p, words: p.words.filter(w => w.id !== snatchFromID)} : p)
			.map(p => p.id === playerID ? { ...p, words: p.words.concat(newWord) } : p),
		letters: { 
			...game.letters, 
			flipped: remaining, 
			flippedPositions: updateFlippedPositions(game.letters.flippedPositions, letters) 
		}
	};

	state.games = state.games.map(g => g.id === updatedGame.id ? updatedGame: g);

	void pubsub.publish('GAME_IN_PROGRESS_UPDATED', {gameInProgressUpdated: gameToPublishedGame(updatedGame)});

	return updatedGame;
};

export default snatchWordAction;
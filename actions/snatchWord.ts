import { v4 as uuidv4 } from 'uuid';
import { State, Word } from '../types';
import findWordById from '../helpers/findWordById';
import findPlayerByWordId from '../helpers/findPlayerByWordId';
import { snatchLetters } from '../letters';
import { pubsub } from '../resolvers/resolvers';

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
	const snatchFrom = findWordById(game.players, snatchFromID);
	const playerLosingWord = findPlayerByWordId(game.players, snatchFromID);
	playerLosingWord.words = playerLosingWord.words.filter(w => w.id !== snatchFromID);
	const { word: letters, remaining } = snatchLetters(word, game.letters.flipped, snatchFrom);
	const newWord: Word = {
		id: uuidv4(),
		letters
	};
	player.words = player.words.concat(newWord);
	game.letters.flipped = remaining;
	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});
	return game;
};

export default snatchWordAction;
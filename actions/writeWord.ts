import { v4 as uuidv4 } from 'uuid';
import { State, Word } from '../types';
import { getLettersForWord } from '../letters';
import { pubsub } from '../resolvers/resolvers';

const writeWordAction = (state: State, playerID: string, gameID: string, word: string) => {
	const player = state.players.find(
		(p) => p.id.toString() === playerID
	);
	if (!player) {
		throw new Error('Could not find player');
	}
	const game = state.games.find(
		(g) => g.id.toString() === gameID
	);
	if (!game) {
		throw new Error('Could not find game');
	}
	const { word: letters, remaining } = getLettersForWord(word, game.letters.flipped);
	const newWord: Word = {
		id: uuidv4(),
		letters
	};
	player.words = player.words.concat(newWord);
	console.log('word', newWord);
	game.letters.flipped = remaining;
	pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
		throw new Error('Something went wrong');
	});
	return game;
};

export default writeWordAction;
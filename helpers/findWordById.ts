import { Player } from '../types';

const findWordById = (playerList: Player[], wordId: string) => {
	const allWordsInGame = playerList.map(p => p.words).reduce((a, b) => a.concat(b));
	const foundWord = allWordsInGame.find(w => w.id === wordId);
	if (!foundWord) {
		throw new Error('Word not found in game');
	}
	return foundWord;
};

export default findWordById;
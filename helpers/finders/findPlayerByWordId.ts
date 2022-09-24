import { Player } from '../../types';

const findPlayerByWordId = (playerList: Player[], wordId: string) => {
	// Given a word id, returns the player who owns that word
	const foundPlayer = playerList.find(p => p.words.map(w => w.id).includes(wordId));
	if (!foundPlayer) {
		throw new Error('Player with that word was not found');
	}
	return foundPlayer;
};

export default findPlayerByWordId;
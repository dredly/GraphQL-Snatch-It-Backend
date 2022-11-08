import { Player } from '../types';
import getWordString from './letters/getWordString';

// Should rename to something like getScoreDefault if implementing different score functions in future
export const getScore = (wordStrings: string[]): number => {
	if (!wordStrings.length) {
		return 0;
	}
	const excessLetters = wordStrings  
		.map(ws => ws.substring(3))
		.reduce((a, b) => a + b);
	return wordStrings.length + excessLetters.length;
};

// Pass in scoreFunc as an argument to allow for different per word scoring systems and easier testing
const getScores = (players: Player[], scoreFunc: (wordString: string[]) => number) => {
	return players
		.map(p => ({
			name: p.name, 
			score: scoreFunc(p.words.map(w => getWordString(w)))
		}))
		.sort((a, b) => b.score - a.score);
};

export default getScores;
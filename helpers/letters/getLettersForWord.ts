import { Letter } from '../../types';

const getLettersForWord = (word: string, letterPool: Letter[]) => {
	const wordCharArray = word.toLowerCase().split('');
	const availableLetters = [...letterPool];
	const lettersForWord = [];
	for (const char of wordCharArray) {
		const letter = availableLetters.find(lett => lett.value.toLowerCase() === char);
		if (!letter) {
			throw new Error('Letter not available');
		}
		availableLetters.splice(availableLetters.indexOf(letter), 1);
		lettersForWord.push(letter);
	}
	return {
		letters: lettersForWord,
		remaining: availableLetters
	};
};

export default getLettersForWord;
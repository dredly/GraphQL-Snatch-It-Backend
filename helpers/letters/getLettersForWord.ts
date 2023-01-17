import { Letter } from '../../types';

const getLettersForWord = (word: string, letterPool: Letter[]) => {
	const wordCharArray = word.toLowerCase().split('');
	const availableLetters = [...letterPool];
	const lettersForWord = [];
	for (const char of wordCharArray) {
		const letter = availableLetters.find(lett => lett.value.toLowerCase() === char);
		if (!letter) {
			throw new Error('Not all letters available');
		}
		availableLetters.splice(availableLetters.indexOf(letter), 1);
		// Once letters are in a word, we want the rotation to be 0
		lettersForWord.push({ ...letter, rotation: 0 });
	}
	return {
		letters: lettersForWord,
		remaining: availableLetters
	};
};

export default getLettersForWord;
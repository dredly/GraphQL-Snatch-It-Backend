import { Letter, Word } from '../../types';

const snatchLetters = (word: string, letterPool: Letter[], snatchFrom: Word) => {
	const wordCharArray = word.toLowerCase().split('');
	const availableLetters = [...letterPool];
	const snatchFromLetters = [...snatchFrom.letters];
	const lettersForWord = [];
	for (const char of wordCharArray) {
		// First look for letter in the word to snatch from, and only look i the letter pool if it
		// is not there
		const snatchedLetter = snatchFromLetters.find(lett => lett.value.toLowerCase() === char);
		if (!snatchedLetter) {
			const letter = availableLetters.find(lett => lett.value.toLowerCase() === char);
			if (!letter) {
				throw new Error('Letter not available');
			}
			availableLetters.splice(availableLetters.indexOf(letter), 1);
			lettersForWord.push(letter);
		} else {
			snatchFromLetters.splice(snatchFromLetters.indexOf(snatchedLetter), 1);
			lettersForWord.push(snatchedLetter);
		}
	}
	if (snatchFromLetters.length) {
		throw new Error('Did not fully use up letters from snatched word');
	}
	
	return {
		letters: lettersForWord,
		remaining: availableLetters
	};
};

export default snatchLetters;
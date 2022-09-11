import { v4 as uuidv4 } from 'uuid';
import { Letter, Word } from './types';

export const allLetters = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYZ';

export const generateLetters = (startingString: string): Letter[] => {
	return startingString.split('').map(char => {
		return {
			id: uuidv4(),
			value: char,
		};
	});
};

export const getLettersForWord = (word: string, letterPool: Letter[]) => {
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
		word: lettersForWord,
		remaining: availableLetters
	};
};

export const snatchLetters = (word: string, letterPool: Letter[], snatchFrom: Word) => {
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
		word: lettersForWord,
		remaining: availableLetters
	};
};
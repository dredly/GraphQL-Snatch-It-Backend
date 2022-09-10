import { v4 as uuidv4 } from 'uuid';
import { Letter } from './types';

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
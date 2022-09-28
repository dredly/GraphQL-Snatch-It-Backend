import { v4 as uuidv4 } from 'uuid';
import { Letter } from './types';

export const allLetters = 'AAAAABBCCCCDDDDEEEEEEEEEEEEFFFFGGHHHHHIIIIIJKLLLLLMMMMNNNNNOOOOOOPPPQRRRRRSSSSSTTTTTTTUUUUVVWWWXYYYZ';

export const generateLetters = (startingString: string): Letter[] => {
	return startingString.split('').map(char => {
		return {
			id: uuidv4(),
			value: char,
		};
	});
};
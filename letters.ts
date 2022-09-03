import { v4 as uuidv4 } from 'uuid';
import { Letter } from './types';

const allLetters = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFF\
	GGGHHIIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRR\
	SSSSTTTTTTUUUUVVWWXYZ';

export const generateLetters = (): Letter[] => {
	return allLetters.split('').map(char => {
		return {
			id: uuidv4(),
			value: char,
			exposed: false
		};
	});
};
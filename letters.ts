import { v4 as uuidv4 } from "uuid";

interface Letter {
	id: string
	value: string
	exposed: boolean
}

const allLetters = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFF\
	GGGHHIIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRR\
	SSSSTTTTTTUUUUVVWWXYZ';

const generateLetters = (): Letter[] => {
	return allLetters.split('').map(char => {
		return {
			id: uuidv4(),
			value: char,
			exposed: false
		};
	});
};

export {Letter, generateLetters};
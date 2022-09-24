import { Game } from '../../types';

const handleLastFlip = (game: Game) => {
	console.log(`No more letters to flip in game with id = ${game.id}`);
};

export default handleLastFlip;
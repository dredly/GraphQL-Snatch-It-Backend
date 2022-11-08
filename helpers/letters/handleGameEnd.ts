import { Game } from '../../types';
import { getScore } from '../getScores';
import getScores from '../getScores';

const handleGameEnd = (game: Game) => {
	console.log('Game over');
	console.log(getScores(game.players, getScore));
};

export default handleGameEnd;
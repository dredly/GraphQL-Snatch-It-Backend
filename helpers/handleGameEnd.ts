import { Game } from '../types';
import { getScore } from './getScores';
import { state } from '../resolvers/resolvers';
import getScores from './getScores';
import deleteGameInProgressAction from '../actions/deleteGameInProgress';

const handleGameEnd = (game: Game) => {
	console.log('Game over');
	console.log(getScores(game.players, getScore));
	deleteGameInProgressAction(state, game.id);
};

export default handleGameEnd;
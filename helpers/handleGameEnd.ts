import { Game } from '../types';
import { getScore } from './getScores';
import { pubsub, state } from '../resolvers/resolvers';
import getScores from './getScores';
import deleteGameInProgressAction from '../actions/deleteGameInProgress';

const handleGameEnd = (game: Game) => {
	console.log('Game over');
	const gameSummary = {
		id: game.id,
		scoreList: getScores(game.players, getScore)
	};
	void pubsub.publish('GAME_IN_PROGRESS_ENDED', { gameInProgressEnded: gameSummary });
	deleteGameInProgressAction(state, game.id);
};

export default handleGameEnd;
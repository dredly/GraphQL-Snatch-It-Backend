import { Game } from '../../types';
import 'gqlobby-server/lib/resolvers/mutationResolvers';
import handleGameEnd from '../handleGameEnd';
import config from '../../config';

const handleLastFlip = (game: Game) => {
	console.log(`No more letters to flip in game with id = ${game.id}`);
	setTimeout(() => {
		handleGameEnd(game);
	}, config.gameRules.endGameTimeLimit);
};

export default handleLastFlip;
import { Game } from '../../types';
import 'gqlobby-server/lib/resolvers/mutationResolvers';
import handleGameEnd from './handleGameEnd';

const handleLastFlip = (game: Game) => {
	console.log(`No more letters to flip in game with id = ${game.id}`);
	//TODO: Wait for players to make final plays etc
	handleGameEnd(game);
};

export default handleLastFlip;
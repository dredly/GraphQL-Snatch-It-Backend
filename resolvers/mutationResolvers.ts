import { Game as LobbyGame} from 'gqlobby-server/lib/types';

import { state } from './resolvers';
import declareReadinessAction from '../actions/declareReadiness';
import writeWordAction from '../actions/writeWord';
import snatchWordAction from '../actions/snatchWord';
import handleLetterFlip from '../helpers/letters/handleLetterFlip';
import createGameInProgressAction from '../actions/createGameInProgress';
import { lessLetters, generateLetters } from '../letters';

const mutationResolvers = {
	createGameInProgress: (_root: undefined, args: {game: Omit<LobbyGame, 'status'>}) => {
		return (
			createGameInProgressAction(state, args.game, () => generateLetters(lessLetters), handleLetterFlip)
		);
	},
	declareReadiness: (_root: undefined, args: {playerID: string}) => declareReadinessAction(state, args.playerID, handleLetterFlip),
	writeWord: (_root: undefined, args: {playerID: string, gameID: string, word: string}) => (
		writeWordAction(state, args.playerID, args.gameID, args.word)
	),
	snatchWord: (_root: undefined, args: {playerID: string, gameID: string, word: string, snatchFromID: string}) => (
		snatchWordAction(state, args.playerID, args.gameID, args.word, args.snatchFromID)
	)
};

export default mutationResolvers;
import { state } from './resolvers';

import declareReadinessAction from '../actions/declareReadiness';
import writeWordAction from '../actions/writeWord';
import snatchWordAction from '../actions/snatchWord';
import handleLetterFlip from '../helpers/letters/handleLetterFlip';

const mutationResolvers = {
	declareReadiness: (_root: undefined, args: {playerID: string}) => declareReadinessAction(state, args.playerID, handleLetterFlip),
	writeWord: (_root: undefined, args: {playerID: string, gameID: string, word: string}) => (
		writeWordAction(state, args.playerID, args.gameID, args.word)
	),
	snatchWord: (_root: undefined, args: {playerID: string, gameID: string, word: string, snatchFromID: string}) => (
		snatchWordAction(state, args.playerID, args.gameID, args.word, args.snatchFromID)
	)
};

export default mutationResolvers;
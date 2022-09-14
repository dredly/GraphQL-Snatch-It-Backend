import { state } from './resolvers';

import newPlayerAction from '../actions/createPlayer';
import createGameAction from '../actions/createGame';
import joinGameAction from '../actions/joinGame';
import startGameAction from '../actions/startGame';
import declareReadinessAction from '../actions/declareReadiness';
import writeWordAction from '../actions/writeWord';
import snatchWordAction from '../actions/snatchWord';

const mutationResolvers = {
	createPlayer: (_root: undefined, args: {name: string}) => newPlayerAction(state, args.name),
	createGame: (_root: undefined, args: {playerID: string}) => createGameAction(state, args.playerID),
	joinGame: (_root: undefined, args: {playerID: string, gameID: string}) => (
		joinGameAction(state, args.playerID, args.gameID)
	),
	startGame: (_root: undefined, args: {gameID: string}) => startGameAction(state, args.gameID),
	declareReadiness: (_root: undefined, args: {playerID: string}) => declareReadinessAction(state, args.playerID),
	writeWord: (_root: undefined, args: {playerID: string, gameID: string, word: string}) => (
		writeWordAction(state, args.playerID, args.gameID, args.word)
	),
	snatchWord: (_root: undefined, args: {playerID: string, gameID: string, word: string, snatchFromID: string}) => (
		snatchWordAction(state, args.playerID, args.gameID, args.word, args.snatchFromID)
	)
};

export default mutationResolvers;
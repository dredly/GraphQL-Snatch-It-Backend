import { Game as LobbyGame} from 'gqlobby-server/lib/types';

import config from '../config';
import { Game, Letter, State } from '../types';
import { pubsub } from '../resolvers/resolvers';
import { gameToPublishedGame } from '../helpers/mappers';

const createGameInProgressAction = (
	state: State, 
	lobbyGame: Omit<LobbyGame, 'status'>, 
	generateAllLetters: () => Letter[],
	handleLetterFlip: (state: State, gameID: string) => void
): Game => {

	// Important for the functionality of the game to set ready value of all players to false
	const newGame: Game = {
		id: lobbyGame.id,
		players: lobbyGame.players.map(p => ({...p, ready: false, words: []})),
		letters: {
			unflipped: generateAllLetters(),
			flipped: [],
			flippedPositions: new Map()
		}
	};

	state.games = state.games.concat(newGame);

	// Start the timer for automatically flipping a new letter
	const timeoutId = setTimeout(() => {
		handleLetterFlip(state, newGame.id);
	}, config.gameRules.roundTimeLimit);
	state.timers.set(newGame.id, timeoutId);

	void pubsub.publish('GAME_IN_PROGRESS_STARTED', {gameInProgressStarted: gameToPublishedGame(newGame) });

	return newGame;
};

export default createGameInProgressAction;
import { Game as LobbyGame} from 'gqlobby-server/lib/types';
import { generateLetters, allLetters } from '../letters';
import { Game, State } from '../types';


// TODO: Will have to figure out how to pass an entire lobbyGame to the resolver
const createGameInProgressAction = (state: State, lobbyGame: LobbyGame): Game => {

	//Important for the functionality of the game to set ready value of all players to false
	const newGame: Game = {
		id: lobbyGame.id,
		players: lobbyGame.players.map(p => ({...p, ready: false, words: []})),
		letters: {
			unflipped: generateLetters(allLetters),
			flipped: []
		}
	};

	state.games = state.games.concat(newGame);

	return newGame;
};

export default createGameInProgressAction;
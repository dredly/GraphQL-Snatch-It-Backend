import { State, Game } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { generateLetters, allLetters } from '../letters';
import { pubsub } from '../resolvers/resolvers';

const createGameAction = (state: State, playerID: string): Game => {
	const creator = state.players.find(
		(p) => p.id.toString() === playerID
	);
	if (!creator) {
		throw new Error('Could not find player');
	}
	console.log('creator', creator);
	const newGame: Game = {
		started: false,
		players: [creator],
		letters: {unflipped: generateLetters(allLetters), flipped: []},
		id: uuidv4(),
	};
	state.games = state.games.concat(newGame);

	pubsub.publish('GAME_ADDED', {gameAdded: newGame}).catch(() => {
		throw new Error('Something went wrong');
	});

	return newGame;
};

export default createGameAction;
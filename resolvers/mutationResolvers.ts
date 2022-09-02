import { v4 as uuidv4 } from 'uuid';
import { state, pubsub } from './resolvers';
import { generateLetters } from '../letters';
import { Game } from '../types';

const mutationResolvers = {
	createPlayer: (_root: undefined, args: {name: string}) => {
		const newPlayer = {
			name: args.name,
			ready: false,
			id: uuidv4(),
		};
		state.players = state.players.concat(newPlayer);
		return newPlayer;
	},
	createGame: (_root: undefined, args: {playerID: string}) => {
		const creator = state.players.find(
			(p) => p.id.toString() === args.playerID
		);
		if (!creator) {
			throw new Error('Could not find player');
		}
		console.log('creator', creator);
		const newGame: Game = {
			started: false,
			players: [creator],
			letters: generateLetters(),
			id: uuidv4(),
		};
		state.games = state.games.concat(newGame);
  
		pubsub.publish('GAME_ADDED', {gameAdded: newGame})
			.catch(() => {
				throw new Error('Could not add game');
			});
  
		return newGame;
	},
	joinGame: (_root: undefined, args: {playerID: string, gameID: string}) => {
		const player = state.players.find(
			(p) => p.id.toString() === args.playerID
		);
		if (!player) {
			throw new Error('Could not find player');
		}
		const game = state.games.find(
			(g) => g.id.toString() === args.gameID
		);
		if (!game) {
			throw new Error('Could not find game');
		}
		game.players = game.players.concat(player);
  
		pubsub.publish('PLAYER_JOINED', {playerJoined: game})
			.catch(() => {
				throw new Error('Could not join game');
			});
  
		return game;
	},
	startGame: (_root: undefined, args: {gameID: string}) => {
		const game = state.games.find(
			(g) => g.id.toString() === args.gameID
		);
		if (!game) {
			throw new Error('Could not find game');
		}
		game.started = true;
		pubsub.publish('GAME_STARTED', {gameStarted: game})
			.catch(() => {
				throw new Error('Could not start game');
			});
		return game;
	},
	declareReadiness: (_root: undefined, args: {playerID: string}) => {
		const player = state.players.find(
			(p) => p.id.toString() === args.playerID
		);
		if (!player) {
			throw new Error('Could not find player');
		}
		player.ready = !player.ready;
  
		const game = state.games
			.find(g => g.players.map(p => p.id).includes(player.id));
        
		if (!game) {
			throw new Error('Could not find game');
		}
  
		game.players = game.players.map(p => (
			p.id === player.id ? player : p
		));
  
		pubsub.publish('PLAYER_READY', {playerReady: game}).catch(() => {
			throw new Error('Something went wrong');
		});
		return game;
	},
	flipLetter: (_root: undefined, args: {gameID: string}) => {
		const game = state.games.find(
			(g) => g.id.toString() === args.gameID
		);
		if (!game) {
			throw new Error('Could not find game');
		}
		const unflipped = game.letters.filter(lett => !lett.exposed);
		const randomLetter = unflipped[Math.floor(Math.random() * unflipped.length)];
		game.letters = game.letters.map(lett => lett.id === randomLetter.id ? { ...lett, exposed: true} : lett);
		pubsub.publish('LETTER_FLIPPED', {letterFlipped: game}).catch(() => {
			throw new Error('Something went wrong');
		});
		return game;
	}
};

export default mutationResolvers;
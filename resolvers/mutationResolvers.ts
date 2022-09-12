import { v4 as uuidv4 } from 'uuid';
import { state, pubsub } from './resolvers';
import { generateLetters, getLettersForWord, allLetters, snatchLetters } from '../letters';
import { Game, Word } from '../types';
import config from '../config';
import flipLetterAction from '../actions/flipLetter';
import newPlayerAction from '../actions/createPlayer';
import findPlayerByWordIdAction from '../actions/findPlayerByWordId';

const mutationResolvers = {
	createPlayer: (_root: undefined, args: {name: string}) => newPlayerAction(state, args.name),
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
			letters: {unflipped: generateLetters(allLetters), flipped: []},
			id: uuidv4(),
		};
		state.games = state.games.concat(newGame);
  
		pubsub.publish('GAME_ADDED', {gameAdded: newGame}).catch(() => {
			throw new Error('Something went wrong');
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
  
		pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
			throw new Error('Something went wrong');
		});
  
		return game;
	},
	startGame: (_root: undefined, args: {gameID: string}) => {
		console.log('Received request to start game');
		const game = state.games.find(
			(g) => g.id.toString() === args.gameID
		);
		if (!game) {
			throw new Error('Could not find game');
		}
		game.started = true;
		// Set all players ready value back to false, as it will be reused for declaring
		// readiness to flip letters
		for (const player of game.players) {
			player.ready = false;
		}
		pubsub.publish('GAME_STARTED', {gameStarted: game}).catch(() => {
			throw new Error('Something went wrong');
		});
		const timeoutId = setTimeout(() => {
			console.log('Server automatically flipping letter');
			flipLetterAction(game);
		}, config.gameRules.roundTimeLimit);
		state.timers.set(game.id, timeoutId);
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

		// Check if players are all ready for a letter to be flipped
		if (game.started && game.players.filter(p => p.ready).length === game.players.length) {
			flipLetterAction(game);
		}
  
		pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
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
		flipLetterAction(game);
		return game;
	},
	writeWord: (_root: undefined, args: {playerID: string, gameID: string, word: string}) => {
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
		const { word, remaining } = getLettersForWord(args.word, game.letters.flipped);
		const newWord: Word = {
			id: uuidv4(),
			letters: word
		};
		player.words = player.words.concat(newWord);
		console.log('word', newWord);
		game.letters.flipped = remaining;
		pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
			throw new Error('Something went wrong');
		});
		return game;
	},
	snatchWord: (_root: undefined, args: {playerID: string, gameID: string, word: string, snatchFromID: string}) => {
		const player = state.players.find(
			(p) => p.id === args.playerID
		);
		if (!player) {
			throw new Error('Could not find player');
		}
		const game = state.games.find(
			(g) => g.id === args.gameID
		);
		if (!game) {
			throw new Error('Could not find game');
		}
		const snatchFrom = player.words.find(
			(w) => w.id === args.snatchFromID
		);
		if (!snatchFrom) {
			throw new Error('Could not find word to snatch from');
		}
		const playerLosingWord = findPlayerByWordIdAction(game.players, args.snatchFromID);
		playerLosingWord.words = playerLosingWord.words.filter(w => w.id !== args.snatchFromID);
		const { word, remaining } = snatchLetters(args.word, game.letters.flipped, snatchFrom);
		const newWord: Word = {
			id: uuidv4(),
			letters: word
		};
		player.words = player.words.concat(newWord);
		game.letters.flipped = remaining;
		pubsub.publish('GAME_UPDATED', {gameUpdated: game}).catch(() => {
			throw new Error('Something went wrong');
		});
		return game;
	}
};

export default mutationResolvers;
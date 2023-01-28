import { Game, PublishedGame, FlippedPositionMapTuple } from '../types';
import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

const flippedPositionsToMapTuples = (flippedPositions: Map<string, number>): FlippedPositionMapTuple[] => {
	return [...flippedPositions.entries()].map(entry => ({
		key: entry[0], value: entry[1]
	}));
};

export const gameToPublishedGame = (game: Game): PublishedGame => {
	return { ...cd(game), letters: {
		...game.letters,
		flippedPositions: flippedPositionsToMapTuples(game.letters.flippedPositions)
	}};
};
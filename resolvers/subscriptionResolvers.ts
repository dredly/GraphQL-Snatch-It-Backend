import { pubsub } from './resolvers';

//TODO: refactor to general game update
const subscriptionResolvers = {
	gameAdded: {
		subscribe: () => pubsub.asyncIterator(['GAME_ADDED'])
	},
	playerJoined: {
		subscribe: () => pubsub.asyncIterator(['PLAYER_JOINED'])
	},
	playerReady: {
		subscribe: () => pubsub.asyncIterator(['PLAYER_READY'])
	},
	gameStarted: {
		subscribe: () => pubsub.asyncIterator(['GAME_STARTED'])
	},
	letterFlipped: {
		subscribe: () => pubsub.asyncIterator(['LETTER_FLIPPED'])
	},
	wordWritten: {
		subscribe: () => pubsub.asyncIterator(['WORD_WRITTEN'])
	}
};

export default subscriptionResolvers;
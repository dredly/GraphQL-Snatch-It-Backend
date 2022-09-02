import { pubsub } from './resolvers';

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
	}
};

export default subscriptionResolvers;
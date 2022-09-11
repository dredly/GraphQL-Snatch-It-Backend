import { pubsub } from './resolvers';

const subscriptionResolvers = {
	gameAdded: {
		subscribe: () => pubsub.asyncIterator(['GAME_ADDED'])
	},
	gameStarted: {
		subscribe: () => pubsub.asyncIterator(['GAME_STARTED'])
	},
	gameUpdated: {
		subscribe: () => pubsub.asyncIterator(['GAME_UPDATED'])
	}
};

export default subscriptionResolvers;
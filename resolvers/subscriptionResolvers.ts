import { pubsub } from './resolvers';

const subscriptionResolvers = {
	gameInProgressStarted: {
		subscribe: () => pubsub.asyncIterator(['GAME_IN_PROGRESS_STARTED'])
	},
	gameInProgressUpdated: {
		subscribe: () => pubsub.asyncIterator(['GAME_IN_PROGRESS_UPDATED'])
	},
	gameInProgressEnded: {
		subscribe: () => pubsub.asyncIterator(['GAME_IN_PROGRESS_ENDED'])
	}
};

export default subscriptionResolvers;
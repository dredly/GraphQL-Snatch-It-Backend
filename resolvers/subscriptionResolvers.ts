import { pubsub } from './resolvers';

const subscriptionResolvers = {
	gameInProgressUpdated: {
		subscribe: () => pubsub.asyncIterator(['GAME_IN_PROGRESS_UPDATED'])
	}
};

export default subscriptionResolvers;
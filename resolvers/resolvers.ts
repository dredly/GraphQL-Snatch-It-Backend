import { v4 as uuidv4 } from 'uuid';
import { PubSub } from 'graphql-subscriptions';
import { State } from '../types';
import queryResolvers from './queryResolvers';
import mutationResolvers from './mutationResolvers';
import subscriptionResolvers from './subscriptionResolvers';

export const state: State = {
	players: [
		{
			name: 'Miguel',
			ready: false,
			id: uuidv4(),
		},
		{
			name: 'Igor',
			ready: false,
			id: uuidv4(),
		},
	],
	games: [],
};

export const pubsub = new PubSub();

const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Subscription: subscriptionResolvers   
};

export {resolvers};

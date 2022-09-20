import { PubSub } from 'graphql-subscriptions';
import { State } from '../types';
import queryResolvers from './queryResolvers';
import mutationResolvers from './mutationResolvers';
import subscriptionResolvers from './subscriptionResolvers';

export const state: State = {
	//starting players just for testing
	games: [],
	timers: new Map<string, NodeJS.Timeout>([])
};

export const pubsub = new PubSub();

const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Subscription: subscriptionResolvers   
};

export {resolvers};

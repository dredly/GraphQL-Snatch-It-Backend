import { v4 as uuidv4 } from 'uuid';
import { Player, State } from '../types';

const newPlayerAction = (state: State, name: string): Player => {
	const newPlayer = {
		name,
		ready: false,
		words: [],
		id: uuidv4(),
	};
	state.players = state.players.concat(newPlayer);
	return newPlayer;
};

export default newPlayerAction;
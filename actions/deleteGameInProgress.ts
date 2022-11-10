import { State } from '../types';

const deleteGameInProgressAction = (state: State, gameId: string) => {
	state.games =  state.games.filter(g => g.id !== gameId);
};

export default deleteGameInProgressAction;
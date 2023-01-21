import { Player as LobbyPlayer } from 'gqlobby-server/lib/types';
import { Game as LobbyGame } from 'gqlobby-server/lib/types';

export interface Letter {
	id: string
	value: string
  rotation: number
}

export interface Letters {
  unflipped: Letter[]
  flipped: Letter[],
  // Map of format letterId: position in grid
  flippedPositions: Map<string, number>
}

export interface Word {
  id: string
  letters: Letter[]
}

export interface Player extends LobbyPlayer {
  words: Word[]
}

export interface Game extends Omit<LobbyGame, 'status'> {
  players: Player[]
  letters: Letters
}

export interface State {
  games: Game[]
  // Timers is a map of format gameId: intervalId
  timers: Map<string, NodeJS.Timeout>
}
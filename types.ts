export interface Letter {
	id: string
	value: string
	exposed: boolean
}

export interface Word {
  id: string
  letters: Letter[]
}

export interface Player {
  name: string
  ready: boolean
  words: Word[]
  id: string
}

export interface Game {
  started: boolean
  players: Player[]
  letters: Letter[]
  id: string
}

export interface State {
  players: Player[]
  games: Game[]
  //Timers is a map of format gameId: intervalId
  timers: Map<string, NodeJS.Timeout>
}
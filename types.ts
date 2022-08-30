export interface Letter {
	id: string
	value: string
	exposed: boolean
}

export interface Player {
  name: string
  ready: boolean
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
}
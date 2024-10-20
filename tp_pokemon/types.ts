export type PokemonEntry = {
  name: string
  url: string
}

export type Move = {
  name: string
  power: number
  accuracy: number
  pp: number
}

export type StatData = {
  name: string
  url: string
}

export type Pokemon = {
  name: string
  stats: {
    base_stat: number
    effort: number
    stat: StatData
  }[]
  moves: MoveData[]
}

export type MoveData = {
  move: {
    name: string
    url: string
  }
}

export type FightingPokemon = {
  hp: number
  data: Pokemon
  moves: Move[]
}

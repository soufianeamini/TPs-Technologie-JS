import { input, select } from "@inquirer/prompts"

type PokemonEntry = {
  name: string
  url: string
}

type Move = {
  name: string
  power: number
  accuracy: number
  pp: number
}

type StatData = {
    name: string
    url: string
}

type Pokemon = {
  name: string
  stats: {
    base_stat: number
    effort: number
    stat: StatData
  }[]
  moves: MoveData[]
}

type MoveData = {
  move: {
    name: string
    url: string
  }
}

async function get(url: string): Promise<any> {
  return await fetch(url).then((res) => res.json())
}

async function loadPokemon(url: string): Promise<Pokemon> {
  return (await get(url)) as Pokemon
}

async function loadPokemons(): Promise<PokemonEntry[]> {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  const result: any = await get(url)
  const pokemons = result.results

  return pokemons
}

async function selectPokemon(pokemons: PokemonEntry[]): Promise<PokemonEntry> {
  let pokemonFound = false
  let finalPokemon: PokemonEntry | undefined = undefined

  while (!pokemonFound) {
    const pokemonName = await input({
      message: "What pokemon do you want to use?",
    })

    finalPokemon = pokemons.find((p) => p.name === pokemonName.toLowerCase())
    if (finalPokemon) {
      console.log("Pokemon found!")
      console.log({ pokemon: finalPokemon })
      console.log("Do you want to use this pokemon?")
      pokemonFound = await select({
        message: "Do you want to use this pokemon?",
        choices: [
          { name: "yes", value: true },
          { name: "no", value: false },
        ],
      })
    } else {
      finalPokemon = pokemons.find((p) =>
        p.name.includes(pokemonName.toLowerCase())
      )

      if (finalPokemon) {
        console.log("Similarly named Pokemon found!")
        console.log({ pokemon: finalPokemon })
        pokemonFound = await select({
          message: `Did you mean to choose ${finalPokemon.name}?`,
          choices: [
            { name: "yes", value: true },
            { name: "no", value: false },
          ],
        })
      }
    }
  }

  return finalPokemon as PokemonEntry
}

function getRandom(list: any[]) {
  const index = Math.floor(Math.random() * list.length)
  const value: any = list[index]
  list.splice(index, index + 1)

  return value
}
async function loadMoves(pokemon: Pokemon): Promise<Move[]> {
  const moveDataArray: MoveData[] = []
  for (let i = 0; i < 5; i++) {
    const move = getRandom(pokemon.moves)
    moveDataArray.push(move)
  }

  const promises = moveDataArray.map((move) => get(move.move.url))
  const result = await Promise.all(promises)

  return result
}

type FightingPokemon = {
  hp: number
  data: Pokemon
  moves: Move[]
}

async function main() {
  console.log("Please wait, fetching pokemon data from api..")
  const pokemons = await loadPokemons()
  const selectedPokemon = await selectPokemon(pokemons)
  const activePokemon: Pokemon = await loadPokemon(selectedPokemon.url)
  const moves = await loadMoves(activePokemon)
  console.log(
    "Your pokemon is ready to fight. Choosing random pokemon opponent..."
  )
  const opponentPokemon = await loadPokemon(getRandom(pokemons).url)

  console.log("Your opponent is: ", opponentPokemon.name)

  const player: FightingPokemon = {
    data: activePokemon,
    hp: 300,
    moves,
  }

  const enemy: FightingPokemon = {
    data: opponentPokemon,
    hp: 300,
    moves,
  }

  runFight(player, enemy)
}

async function runFight(player: FightingPokemon, enemy: FightingPokemon) {
  let i = 1
  while (player.hp > 0 && enemy.hp > 0) {
    console.log("---------")
    console.log(`Turn ${i}`)
    console.log("---------")
    i++
    //name and value
    const choices = player.moves.map((move) => ({
      name: `${move.name} - Power: ${move.power ?? 0}`,
      value: move,
    }))
    const playerMove = await select({ message: "Choose your move", choices })
    playerMove.pp -= 1

    console.log("")
    console.log(`Your pokemon uses ${playerMove.name}!`)
    if (Math.random() * 100 <= playerMove.accuracy) {
      console.log(`It deals ${playerMove.power ?? 0} damage!`)
      enemy.hp -= playerMove.power
      if (enemy.hp < 0) enemy.hp = 0
      console.log(
        `Your pokemon hp: ${player.hp} - Enemy pokemon hp: ${enemy.hp}`
      )
    } else {
      console.log("Your pokemon misses its attack!")
    }

    if (enemy.hp <= 0) break
    const enemyMove: Move = getRandom(enemy.moves.slice())

    console.log("")
    console.log(`Enemy pokemon ${enemy.data.name} uses ${enemyMove.name}!`)
    if (Math.random() * 100 <= enemyMove.accuracy) {
      console.log(`It deals ${enemyMove.power ?? 0} damage!`)
      player.hp -= enemyMove.power
      if (player.hp < 0) player.hp = 0
      console.log(
        `Your pokemon hp: ${player.hp} - Enemy pokemon hp: ${enemy.hp}`
      )
    } else {
      console.log("Enemy pokemon misses its attack!")
    }
  }
  if (player.hp <= 0) {
    console.log("You lost the fight against", enemy.data.name)
  } else if (enemy.hp <= 0) {
    console.log(
      "You won the fight against",
      enemy.data.name,
      "with your",
      player.data.name,
      "!"
    )
  }
}

main()

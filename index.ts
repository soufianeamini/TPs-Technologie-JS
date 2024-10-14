import { input, select } from "@inquirer/prompts"
import assert from "assert"

type PokemonEntry = {
  name: string
  url: string
}

async function loadPokemon(url: string): Promise<Pokemon> {
  return (await fetch(url).then((res) => res.json())) as Pokemon
}

async function loadPokemons(): Promise<PokemonEntry[]> {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  const result: any = await fetch(url).then((response) => response.json())
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

  assert(finalPokemon !== undefined)
  return finalPokemon as PokemonEntry
}

type Pokemon = {
  name: string
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  moves: {
    move: {
      name: string
      url: string
    }
  }
}

async function loadStats(pokemon: Pokemon) {
	const statsToFetch = ["hp", "attack"]
	const stats = pokemon.stats.filter(stat)
}

async function loadMoves(pokemon: Pokemon) {}

async function main() {
  console.log("Please wait, fetching pokemon data from api..")
  const pokemons = await loadPokemons()
  const selectedPokemon = await selectPokemon(pokemons)
  const activePokemon: Pokemon = await loadPokemon(selectedPokemon.url)
  const moves: any = await loadMoves(activePokemon)
  const stats = loadStats(activePokemon)
  // const moves = randomMovesSelection(activePokemon.moves)
}

main()

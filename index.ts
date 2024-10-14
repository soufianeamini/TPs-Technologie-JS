import { input, select } from "@inquirer/prompts"

type PokemonEntry = {
  name: string
  url: string
}

async function loadPokemons(): Promise<PokemonEntry[]> {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  const result: any = await fetch(url).then((response) => response.json())
  const pokemons = result.results

  return pokemons
}

async function selectPokemon(pokemons: PokemonEntry[]) {
  let pokemonFound = false

  while (!pokemonFound) {
    const pokemonName = await input({
      message: "What pokemon do you want to use?",
    })

    const pokemon = pokemons.find((p) => p.name === pokemonName.toLowerCase())
    if (pokemon) {
      console.log("Pokemon found!")
      console.log({ pokemon })
      console.log("Do you want to use this pokemon?")
      pokemonFound = await select({
        message: "Do you want to use this pokemon?",
        choices: [
          { name: "yes", value: true },
          { name: "no", value: false },
        ],
      })
    } else {
      const pokemon = pokemons.find((p) =>
        p.name.includes(pokemonName.toLowerCase())
      )

      if (pokemon) {
        pokemonFound = await select({
          message: `Did you mean to choose ${pokemon.name}?`,
          choices: [
            { name: "yes", value: true },
            { name: "no", value: false },
          ],
        })
      }
    }
  }
}

async function main() {
  console.log("Please wait, fetching pokemon data from api..")
  const pokemons = await loadPokemons()
  const selectedPokemon = selectPokemon(pokemons)
}

main()

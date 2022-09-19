import React from 'react'
import create from 'zustand'
import './App.css'

// link to gist with all pokemon
const POKE_URL =
  'https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/0658aeff401d196dece7ec6fe6c726c6adc1cc00/gistfile1.txt'

// create useStore hook
const useStore = create(set => ({
  filter: '',
  pokemon: [],
  // set takes a state for filter and returns a new state
  setFilter: filter =>
    set(state => ({
      ...state,
      filter
    })),
  //take in state for pokemon and return new state
  setPokemon: pokemon =>
    set(state => ({
      ...state,
      pokemon
    }))
}))

// Filter input component - returns input
const FilterInput = () => {
  const filter = useStore(state => state.filter)
  const setFilter = useStore(state => state.setFilter)
  // call setFilter when there's an event
  return <input value={filter} onChange={evt => setFilter(evt.target.value)} />
}

function App () {
  // filter hook invocation
  const filter = useStore(state => state.filter)
  const setPokemon = useStore(state => state.setPokemon)
  // const pokemon = useStore(state => state.pokemon)

  React.useEffect(() => {
    fetch(POKE_URL)
      .then(res => res.json())
      .then(pokemon => setPokemon(pokemon))
  })

  const PokemonTable = () => {
    const pokemon = useStore(state => state.pokemon)

    return (
      <table width='95%'>
        <tbody>
          {pokemon.map(({ id, name: { english }, type }) => (
            <tr key={id}>
              <td> {english}</td>
              <td> {type.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className='App'>
      <div>
        {/* call component for when someone filters the pokemon data */}
        <FilterInput />
        <PokemonTable />
      </div>
      {/* add value of filter so we can see if it's returning--it works! */}
      {/* {JSON.stringify()} */}
    </div>
  )
}

export default App

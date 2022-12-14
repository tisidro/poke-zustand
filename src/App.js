import React from 'react'
import create from 'zustand'
import './App.css'

// link to gist with all pokemon
const POKE_URL =
  'https://gist.githubusercontent.com/tisidro/f8703680abdd8006385395e958e75191/raw/417f1a5d8ca8109938548bf69812934cc2a9df89/gistfile1.txt'

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
    //add filtering for table of pokemon
    const filter = useStore(state => state.filter)
    return (
      <table width='95%'>
        <tbody>
          {pokemon
            //for name (in English), turn it to lowercase if it's the one filtered
            .filter(({ name: { english } }) =>
              english.toLowerCase().includes(filter.toLowerCase())
            )
            .map(({ id, name: { english }, type }) => (
              //pull out pokemon type in english from id (using destructuring)
              //join types listed and separate them with a comma
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
        <h2>Type the Pokemon You Want to Catch!</h2>
        {/* call component for when someone filters the pokemon data */}
        <FilterInput />
        <h1>All Pokemon...</h1>
        <PokemonTable />
      </div>
      {/* add value of filter so we can see if it's returning--it works! */}
      {/* {JSON.stringify()} */}
    </div>
  )
}

export default App

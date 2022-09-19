import React from 'react'
import create from 'zustand'
import './App.css'

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
  return (
    <div className='App'>
      <div>
        {/* call component for when someone filters the pokemon data */}
        <FilterInput />
      </div>
      {/* add value of filter so we can see if it's returning--it works! */}
      {filter}
    </div>
  )
}

export default App

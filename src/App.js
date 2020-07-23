import React from 'react';

import { Route, Link } from 'react-router-dom'

import Search from './components/Search'

function Welcome () {
  console.log('welcome test')

  // const first = Math.random()
  // const second = Math.random()
  // const third = Math.random()

  // const randoms = [first, second, third]
  const randoms = [...Array(3)].map(() => {
    const seed = Math.random()
    
    const scaled = seed * 100

    const rounded = Math.round(scaled)

    const year = 1900 + rounded

    // <Route
      // path='/search/:year'
      // component={Search}
    // />
    const path = `/search/${year}`

    const link = <p>
      <Link to={path}>Why not check out {year}</Link>
    </p>

    return link
  })

  return <>
    <h3>Welcome!</h3>
    {randoms}
  </>
}

function App() {
  console.log('appp test')
  return (
    <main>
      <h1>
        <Link to='/'>
          New York Times Search
        </Link>
      </h1>
      <Route
        exact
        path='/'
        component={Welcome}
      />
      <Route
        path='/search/:year'
        component={Search}
      />
    </main>
  );
}

export default App;

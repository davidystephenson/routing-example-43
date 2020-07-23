import React, {
  useState, useEffect
} from 'react';
import axios from 'axios'

import {
  Link, useParams, useHistory
} from 'react-router-dom'

function App() {
  const params = useParams()
  console.log('params test:', params)

  const history = useHistory()

  const initial = params.year
  const [year, setYear] = useState(initial)
  const [stories, setStories] = useState([])

  const url = `https://api.nytimes.com/svc/archive/v1/${params.year}/1.json?api-key=NSwUNt9wRMpQDvwWXJkF59aLRaTYfOq8`

  async function getStories () {
    try {
      const { data } = await axios.get(url)
      // const results = axios.get(url)
      // const docs = results.data.docs

      console.log('data test:', data)

      const { docs } = data.response
      console.log('docs test:', docs)

      const slice = docs.slice(0, 100)

      setStories(slice)
    } catch (error) {
      console.log(error.message)
    }
  }

  function effect () {
    setStories([])
    getStories()
  }

  useEffect(effect, [params.year])

  function onSubmit (event) {
    event.preventDefault()

    const path = `/search/${year}`

    history.push(path)
  }

  function onChange (event) {
    setYear(event.target.value)
  }

  function reset () {
    setYear(initial)
  }

  const paragraphs = stories.map(story => (
    <>
      <h4>{story.headline.print_headline}</h4>

      <p>
        {story.abstract}
      </p> 
    </>
  ))

  const content = paragraphs.length
    ? paragraphs
    : 'Loading...'

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={year}
          onChange={onChange}
        />

        <button>submit</button>
        <button
          type='button'
          onClick={reset}
        >
          reset
        </button>
      </form>

      {content}
    </div>
  );
}

export default App;

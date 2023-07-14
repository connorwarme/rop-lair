import { useState, useEffect } from "react"

const useFetch = (url, auth) => {
  const [data, setData] = useState(null)
  // tutorial example has a setTimeout (1s) delay on the fetch and shows a loading screen momentarily... (so it doesn't look like the webpage is broken)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    fetch(url, {
      headers: auth.headers,
      signal: abortController.signal,
    })
    .then(res => {
      if (!res.ok) {
        throw Error('There was a problem getting a response from the server.')
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      setError(null)
      setLoading(false)
      setData(data)
    // virtual "name" doesn't work yet, have to construct it from first and family name
    // todo: check this by creating new user object (I already changed user model to provide virtuals toJSON)
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted (component unmounted before completed)')
      } else {
        setError(err.message)
        setLoading(false)
      }
    })
    return () => abortController.abort()
    
    // had to leave array empty otherwise it would loop infinitely
    // not sure why, because neither url or auth values changed...
    // seems to work now, besides vsc squawking at me
  }, [] )

  return { data, isLoading, error }
}

export default useFetch
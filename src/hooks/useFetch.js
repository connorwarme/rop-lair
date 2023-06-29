import { useState, useEffect } from "react"

const useFetch = (url, auth) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url, {
      headers: auth.headers,
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
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
    // had to leave array empty otherwise it would loop infinitely
    // not sure why, because neither url or auth values changed...
    // seems to work now, besides vsc squawking at me
  }, [] )

  return { data, isLoading, error }
}

export default useFetch
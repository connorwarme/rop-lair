import axios from "axios"
import { useState, useEffect } from "react"

// I'm not sure how to actually implement this properly. Tutorial was for a get req and via the fetch api
// Not sure how to handle post requests... (moreso because there's more to do if it succeeds or fails...)

const useAxios = (url, auth) => {
  const [data, setData] = useState(null)
  // tutorial example has a setTimeout (1s) delay on the fetch and shows a loading screen momentarily... (so it doesn't look like the webpage is broken)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()

    axios({
      url: url,
      headers: auth.headers,
      signal: abortController.signal,
    })
    .then(res => {
      if (res.status === 200 && !res.data.errors) {
        setError(null)
        setData(res.data)
        console.log('data mode')
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      } else if (res.data.errors) {
        setError(res.data.errors)
        setLoading(false)
      }
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('axios request aborted (component unmounted before completed)')
      } else {
        setError(err.message)
        setLoading(false)
      }
    })
    return () => abortController.abort()
    
    // tutorial has url in the dependencies array
  }, [] )

  return { data, isLoading, error }
}

export default useAxios
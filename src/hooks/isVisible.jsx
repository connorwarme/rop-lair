import { useEffect } from "react"
// left off here - working on a component to recognize if a click occurs outside of a component (ie to close a dropdown menu, etc)
// this may work now that I debugged things... have a simple version in the Nav component

const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        console.log('click outside')
        onClickOutside()
      }
      
    };
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

}
export default useClickOutside
import { useEffect } from "react"
// recognize if a click occurs outside of a component (ie to close a dropdown menu, etc)

const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
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
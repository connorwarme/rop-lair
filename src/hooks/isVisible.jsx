import { useState, useEffect, useRef } from "react";
// left off here - working on a component to recognize if a click occurs outside of a component (ie to close a dropdown menu, etc)


const IsVisible = (initialVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isComponentVisible) {
          setIsComponentVisible(false);
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
export default IsVisible;
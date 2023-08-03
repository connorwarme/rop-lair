const Test = ({ value, setValue }) => {
  const input = value - 2

  const handleClick = () => {
    setValue(prev => prev + 1)
  }
  return (  
    <>
      { (input === 1) && <div>Value is one!</div>}
      { (input > 1) && <div>Value is greater than one.</div>}
      <button onClick={handleClick}>Click Me</button>
    </>
   );
}
 
export default Test;
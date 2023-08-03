const Test = ({ list, setList, profileId}) => {

  const queryFriend = () => {
    return list.list.includes(profileId)
  }
  const queryPending = () => {
    return list.pending.includes(profileId)
  }
  const queryRequest = () => {
    return list.request.includes(profileId)
  }
  const friend = queryFriend()
  const pending = queryPending()
  const request = queryRequest()

  const handleClick = () => {
    setList({
      list: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a449'],
      pending: ['6495da6d5dea80fc65a0a446', '6495da6d5dea80fc65a0a448'],
      request: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a447'],
    })
  }
  return (  
    <>
      { (friend) && <div>We are friends.</div>}
      { (pending) && <div>We are pending friends.</div>}
      { (request) && <div>We are request friends</div>}
      { (!friend && !pending && !request) && <div>We are not friends!</div>}
      <button onClick={handleClick}>Click</button>
    </>
   );
}
 
export default Test;
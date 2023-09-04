const Test = ({ list, setList, profileId}) => {
  // this file is redundant - saving for now, as reference 9/3
  // it was the early iteration of the AddFriend component

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

  const handleDelete = () => {
    setList({
      list: [],
      pending: [],
      request: [],
    })
  }
  const handleFriend = () => {
    setList({
      list: ['6495da6d5dea80fc65a0a447', '6495da6d5dea80fc65a0a449'],
      pending: ['6495da6d5dea80fc65a0a446', '6495da6d5dea80fc65a0a448'],
      request: ['6495da6d5dea80fc65a0a443'],
    })
  }
  const handleAddRequest = () => {
    setList({
      list: ['6495da6d5dea80fc65a0a448', '6495da6d5dea80fc65a0a449'],
      pending: ['6495da6d5dea80fc65a0a446', '6495da6d5dea80fc65a0a448'],
      request: ['6495da6d5dea80fc65a0a443', '6495da6d5dea80fc65a0a447'],
    })
  }
  return (  
    <>
      { (friend) && (
        <>
          <div>We are friends.</div>
          <button onClick={handleDelete}>Delete Friend</button>
        </>
      )}
      { (pending) && (
        <>
          <div>We are pending friends.</div>
          <button onClick={handleDelete}>Delete Pending</button>
        </>
      )}
      { (request) && (
        <>
          <div>We are request friends.</div>
          <button onClick={handleFriend}>Accept</button>
          <button onClick={handleDelete}>Ignore</button>
        </>
      )}
      { (!friend && !pending && !request) && (
        <>
          <div>We are not friends!</div>
          <button onClick={handleAddRequest}>Add Friend</button>
        </>
        )}
    </>
   );
}
 
export default Test;
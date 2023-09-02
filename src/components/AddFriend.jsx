import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { myContext } from "../contexts/Context";

const AddFriend = ({ list, setList, profileId }) => {
  const [errors, setErrors] = useState(null)

  const { userObject, access } = useContext(myContext)

  // fn to take userFriends array and sort out what text to show and option to display

  // my idea here is to have a little feature that provides the friendship status
  // and the action: accept / reject, add friend, ..(revoke friend request?)
  // trying to think through the logic
  // use cases:
  // when user visits another person's profile page
  // when user visits another person's friend list
  // when user visits a list of site members
  
  const queryFriend = () => {
    // component was sometimes firing an error, where list.list was undefined
    // haven't been able to duplicate the error since...
    console.log(list)
    return list.list.includes(profileId)
  }
  const queryPending = () => {
    return list.pending.includes(profileId)
  }
  const queryRequest = () => {
    return list.request.includes(profileId)
  }
  const queryUser = () => {
    return userObject._id === profileId
  }
  const friend = queryFriend()
  const pending = queryPending()
  const request = queryRequest()
  const user = queryUser()

  const handleMakeRequest = () => {
    // user and profile are not friends, user sends request
    axios.post("http://localhost:3000/sendrequest", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      if (res.status === 200 && res.data.userList) {
        console.log(res.data)
        setErrors(null)
        setList(res.data.userList)
        // todo: add visual confirmation (green check) if request went through successfully

      } else if (res.data.errors) {
        // todo: add visual confirmation (red check) if request failed...
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDeleteFriend = () => {
    // currently friends, want to remove from friend list
    axios.post("http://localhost:3000/deletefriend", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setList(res.data.userList)
        // todo: display "removed" on UI (green check?)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
        // todo: display "error" (highlight border in red?)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDeletePending = () => {
    // user has sent request, wants to rescind request
    axios.post("http://localhost:3000/deletefriend", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setList(res.data.userList)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleAcceptRequest = () => {
    // profile has sent request, user clicks to accept
    axios.post("http://localhost:3000/acceptrequest", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setList(res.data.userList)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleDeleteRequest = () => {
    // profile has sent request, user clicks to ignore
    axios.post("http://localhost:3000/deletefriend", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setList(res.data.userList)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return ( 
    <>
      <div className="add-friend-container">
        { !user && (
          <>      
          { friend && (
            <>
              <p className="friend-status">Friends</p>
              <button onClick={handleDeleteFriend}>X</button>
            </>
          )}
          { pending && (
            <>
              <p className="friend-status">Pending</p>
              <button onClick={handleDeletePending}>X</button>
            </>
          )}
          { request && (
            <>
              <button onClick={handleAcceptRequest}>Accept</button>
              <button onClick={handleDeleteRequest}>Ignore</button>
            </>
          )}
          { (!friend && !pending && !request) && (
            <>
              <button onClick={handleMakeRequest}>Add Friend</button>
            </>
          )}
          { errors && (
              errors.map((err, index) => {
                return <p key={index}>{err.status} Error! {err.msg}</p>
              })
          )}
          </>
        )}
      </div>
    </>
   );
}
 
export default AddFriend;
import { useState, useEffect, useContext } from "react"
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { myContext } from "../contexts/Context";

const AddFriend = ({ userFriends, profileId }) => {
  const [notFriends, setNotFriends] = useState(true)
  const [friends, setFriends] = useState(true)
  const [pending, setPending] = useState(true)
  const [request, setRequest] = useState(true)
  const [errors, setErrors] = useState(null)

  const { access } = useContext(myContext)

  const handleMakeRequest = () => {
    // user and profile are not friends
    // text to display: Add Friend
    // option: make friend request (put profileid on pending list for user's friend_list, put userid on request list for profile's friend_list)
    axios.post("http://localhost:3000/sendrequest", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      if (res.status === 200 && res.data.friend_list) {
        console.log(res.data)
        setErrors(false)
        // todo: add visual confirmation (green check) if request went through successfully
        setNotFriends(false)
        setPending(true)
      } else if (res.data.errors) {
        console.log(res.data.errors)
        // todo: add visual confirmation (red check) if request failed...
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleFriends = () => {
    // user and profile are friends
    // text to display: Friends
    // option: maybe a way to remove friend?
  }

  const handlePending = () => {
    // user has sent request, awaiting profile to confirm or deny
    // text to display: Pending
    // option: maybe a way to rescind the request?
  }

  const handleRequest = () => {
    // profile has sent request, awaiting user response
    // text to display: Accept | Ignore
    // option: handle an accept, handle an ignore
  }

  // fn to take userFriends array and sort out what text to show and option to display

  // my idea here is to have a little feature that provides the friendship status
  // and the action: accept / reject, add friend, ..(revoke friend request?)
  // trying to think through the logic
  // use cases:
  // when user visits another person's profile page
  // when user visits another person's friend list
  // when user visits a list of site members

  // maybe this comment makes the axios request for the user's friend list, then populates from there? 
  // axios.get(user_friends)
  // res => data
  // setStateUserFriends

  // I don't want to have to run this request each time (e.g. for each person on the user list page)
  // I need to extract the logic ..?
  // then just pass the component the text, function, etc.
  // how best to do that?
  // useEffect(() => {
  //   axios.get("http://localhost:3000/friendlist", { headers: makeHeaders() })
  //   .then(res => {

  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }, [])

  return ( 
    <>
      <div className="add-friend-container">
        { friends && (
          <>
            <p className="friend-status">Friends</p>
            <button onClick={() => console.log('remove friend(profileid) from friend_list.list')}>X</button>
          </>
        )}
        { pending && (
          <>
            <p className="friend-status">Pending</p>
            <button onClick={() => console.log('remove profileid from friend_list.pending')}>X</button>
          </>
        )}
        { request && (
          <>
            <button onClick={() => console.log('add profileid to friend_list.list & remove from friend_list.request')}>Accept</button>
            <button onClick={() => console.log('remove profileid from friend_list.request')}>Ignore</button>
          </>
        )}
        { notFriends && (
          <>
            <button onClick={handleMakeRequest}>Add Friend</button>
          </>
        )}
        { errors && (
            errors.map((err, index) => {
              return <p key={index}>{err.status} Error! {err.msg}</p>
            })
          )}
      </div>
    </>
   );
}
 
export default AddFriend;
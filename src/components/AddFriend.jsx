import { useState, useEffect, useContext } from "react"
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { myContext } from "../contexts/Context";

const AddFriend = ({ userFriends, profileId }) => {
  const [notFriends, setNotFriends] = useState(true)
  const [friends, setFriends] = useState(userFriends ? userFriends.list.includes(profileId) : false)
  const [pending, setPending] = useState(userFriends ? userFriends.pending.includes(profileId) : false)
  const [request, setRequest] = useState(userFriends ? userFriends.request.includes(profileId) : false)
  const [errors, setErrors] = useState(null)

  const { userObject, access } = useContext(myContext)

  const setReset = () => {
    setNotFriends(false)
    setFriends(false)
    setPending(false)
    setRequest(false)
  }

  // what is the best way to determine which text & button/option needs to be shown?
  // a useEffect hook for each one?
  // todo: this works but ineffeciently
  // need to learn how to do this without a useEffect hook
  useEffect(() => {
    console.log(userObject)
    if (userObject != null) { 
      console.log('we have a user object')     
      if (userObject.friend_list.list.includes(profileId)) {
        console.log('list!!')
        setReset()
        setFriends(true)
      } else if (userObject.friend_list.pending.includes(profileId)) {
        console.log('pending!!')
        setReset()
        setPending(true)
      } else if (userObject.friend_list.request.includes(profileId)) {
        console.log('request!!')
        setReset()
        setRequest(true)
      }}
  }, [ userObject ])

  const handleMakeRequest = () => {
    // user and profile are not friends, user sends request
    axios.post("http://localhost:3000/sendrequest", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      if (res.status === 200 && res.data.userList) {
        console.log(res.data)
        setErrors(null)
        // todo: add visual confirmation (green check) if request went through successfully
        setReset()
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

  const handleDeleteFriend = () => {
    // currently friends, want to remove from friend list
    axios.post("http://localhost:3000/deletefriend", { userid: profileId }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setReset()
        setNotFriends(true)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDeletePending = () => {
    // user has sent request, wants to rescind request
    axios.post("http://localhost:3000/deletefriend", { userid: '6495da6d5dea80fc65a0a447' }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setReset()
        setNotFriends(true)
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
    axios.post("http://localhost:3000/acceptrequest", { userid: '648f861a0f6d81f002a2a222' }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setReset()
        setFriends(true)
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
    axios.post("http://localhost:3000/deletefriend", { userid: '6495da6d5dea80fc65a0a447' }, { headers: { "Authorization": `Bearer ${access}` }})
    .then(res => {
      console.log(res.data)
      if (res.status === 200 && res.data.userList) {
        setErrors(null)
        setReset()
        setNotFriends(true)
      } else if (res.data.errors) {
        setErrors(res.data.errors)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  // fn to take userFriends array and sort out what text to show and option to display

  // my idea here is to have a little feature that provides the friendship status
  // and the action: accept / reject, add friend, ..(revoke friend request?)
  // trying to think through the logic
  // use cases:
  // when user visits another person's profile page
  // when user visits another person's friend list
  // when user visits a list of site members

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
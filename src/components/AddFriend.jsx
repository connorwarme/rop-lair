import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { myContext } from "../contexts/Context";
import add from "../images/icons/plus.svg"
import accept from "../images/icons/check.svg"
import cancel from "../images/icons/cancel.svg"
import deleteIcon from "../images/icons/delete2.svg"
import ignore from "../images/icons/close.svg"
import errorIcon from "../images/icons/error.svg"
import "../styles/addFriendStyle.css"

const AddFriend = ({ list, setList, profileId, full }) => {
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
          { !errors && (
            <>
              { full && (
                <>
                  <h3>Friendship:</h3>
                  <div className="add-friend-full-spacer"></div>
                </> 
              )}
              { friend && (
                <>
                  <p className={`friend-status ${full}`}>Friends</p>
                  <button onClick={handleDeleteFriend} className={`friend-remove-btn ${full}`}>
                    <img src={deleteIcon} alt="Delete" title="Remove Friend" className="delete-icon"/>
                    { full && <p>Remove Friend</p> }
                  </button>
                </>
              )}
              { pending && (
                <>
                  <p className={`friend-status ${full}`}>Pending</p>
                  <button onClick={handleDeletePending} className={`friend-remove-btn ${full}`} title="Cancel Request" >
                    <img src={cancel} alt="Cancel" className="cancel-icon"/>
                    { full && <p>Cancel</p> }
                  </button>
                </>
              )}
              { request && (
                <>
                  <button onClick={handleAcceptRequest} className={`friend-accept-btn ${full}`} title="Accept Request" >
                    <img src={accept} alt="Accept" className="accept-icon"/>
                    { full && <p>Accept</p> }
                  </button>
                  <button onClick={handleDeleteRequest} className={`friend-ignore-btn ${full}`} title="Ignore Request" >
                    <img src={ignore} alt="Ignore" className="ignore-icon"/>
                    { full && <p>Ignore</p> }
                  </button>
                </>
              )}
              { (!friend && !pending && !request) && (
                <>
                  <button onClick={handleMakeRequest} className={`friend-add-btn ${full}`} title="Add Friend" >
                    <img src={add} alt="Add Friend" className="add-icon"/>
                    { full && <p>Add Friend</p> }
                  </button>
                </>
              )}
            </>
          )}     

          { errors && (
              errors.map((err, index) => {
                return (
                  <>
                    <div className="add-friend-spacer"></div>
                    <div key={index} className="add-friend-error">
                      <img src={errorIcon} />
                      <p>{err.status} Error! {err.msg}</p>
                    </div>
                  </>
                )
              })
          )}
          </>
        )}
      </div>
    </>
   );
}
 
export default AddFriend;
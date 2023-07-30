import { useState, useEffect } from "react"
import axios from "axios";

const AddFriend = ({ user, profile, makeHeaders }) => {
  const [userFriends, setUserFriends] = useState(null)
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
  useEffect(() => {
    axios.get("http://localhost:3000/friendlist", { headers: makeHeaders() })
    .then(res => {

    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return ( 
    <>
      <div className="add-friend-container">

      </div>
    </>
   );
}
 
export default AddFriend;
// separate user profile view from a regular profile viewing
// why?
// edit user info
// edit or delete posts
// just use the user object as the profile data...

// I need to get the user object and provide it to a profile component
import { useState, useContext } from "react";
import { myContext } from "../contexts/Context";
import ChangeProfile from "../components/ChangeProfile";
const UserProfile = () => {
  const [edit, setEdit] = useState(false)

  const { userObject, access, setUserObject, makeHeader } = useContext(myContext)

  return ( 
    <>
      { (userObject && edit) && (
        <>
          <p>Edit Profile Mode</p>
          <ChangeProfile user={userObject} setEdit={setEdit} setUserObject={setUserObject} makeHeader={makeHeader} />
        </>
      )}
    </>
   );
}
 
export default UserProfile;
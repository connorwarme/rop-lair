/* eslint-disable react/prop-types */

import AddFriend from "./AddFriend";
import icon from "../images/accountIcon.svg"
import decodeEscapedData from "../utility/escape";

const Profile = ({ userObject, profile, setList }) => {

  // todo: add favorites content 8/24

  return ( 
    <>            
    { profile && (
      <>
        <img src={profile.picture ? profile.picture : icon} style={{height: '120px'}}></img>
        <h1 className="profile-title">{decodeEscapedData(profile.name)}</h1>
        { (profile._id != userObject._id) && <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} /> }
      </>
    )}
    </>
   );
}
 
export default Profile;
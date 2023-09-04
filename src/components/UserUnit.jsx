/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import OtherProfile from "../pages/OtherProfile";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";
import icon from "../images/accountIcon.svg"

const UserUnit = ({ userObject, profile, setList }) => {
  
  return ( 
    <>
      <div className="userUnit-container">
        <Link to={`/user/${profile._id}`} element={<OtherProfile />} >
          <div className="userUnit-content">
            <img src={profile.picture ? profile.picture : icon} alt="User Icon" height={'80px'}/>
            <h4>{decodeEscapedData(profile.name)}</h4>
          </div>
        </Link>
        <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} />
      </div>
    </>
   );
}
 
export default UserUnit;
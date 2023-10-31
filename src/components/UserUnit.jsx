/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import OtherProfile from "../pages/OtherProfile";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";
import icon from "../images/icons/accountIcon.svg"

const UserUnit = ({ userObject, profile, setList }) => {
  
  return ( 
    <>
      <div className="userUnit-container">
        {/* <Link to={`/profile/${profile._id}`} element={<OtherProfile />} > */}
        <Link to={`/profile/${profile._id}`}  >
          <div className="userUnit-content">
            { profile.picture && <img src={profile.picture} alt="Icon" /> }
            { !profile.picture && <img src={icon} alt="Icon" className="account-icon" /> }
            <h4>{decodeEscapedData(profile.name)}</h4>
          </div>
        </Link>
        <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} />
      </div>
    </>
   );
}
 
export default UserUnit;
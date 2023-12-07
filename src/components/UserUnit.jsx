/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";
import icon from "../images/icons/accountIcon.svg"

const UserUnit = ({ userObject, profile, photo, setList }) => {
  
  return ( 
    <>
      <div className="userUnit-container">
        <Link to={`/profile/${profile._id}`}  >
          <div className="userUnit-content">
            { photo && <img src={photo} alt="Icon" /> }
            { !photo && <img src={icon} alt="Icon" className="account-icon" /> }
            <h4>{`${decodeEscapedData(profile.first_name)} ${decodeEscapedData(profile.family_name)}`}</h4>
          </div>
        </Link>
        <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} />
      </div>
    </>
   );
}
 
export default UserUnit;
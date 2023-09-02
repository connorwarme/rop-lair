import { Link } from "react-router-dom";
import OtherProfile from "../pages/OtherProfile";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";

const UserUnit = ({ userObject, profile, setList }) => {
  // need to add in addFriend component
  return ( 
    <>
      <div className="userUnit-container">
        <Link to={`/user/${profile._id}`} element={<OtherProfile />} >
          <div className="userUnit-content">
            <img src={profile.picture} alt="User Icon" height={'80px'}/>
            <h4>{decodeEscapedData(profile.name)}</h4>
          </div>
        </Link>
        <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} />
      </div>
    </>
   );
}
 
export default UserUnit;
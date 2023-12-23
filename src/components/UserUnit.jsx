/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import UserPhoto from "./UserPhoto";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";

const UserUnit = ({ userObject, profile, setList, makeHeader }) => {

  return ( 
    <>
      <div className="userUnit-container">
        <Link to={`/profile/${profile._id}`}  >
          <div className="userUnit-content">
            <UserPhoto userId={profile._id} makeHeader={makeHeader} />
            <h4>{`${decodeEscapedData(profile.first_name)} ${decodeEscapedData(profile.family_name)}`}</h4>
          </div>
        </Link>
        <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} />
      </div>
    </>
   );
}
 
export default UserUnit;
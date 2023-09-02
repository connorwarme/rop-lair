import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";

const UserUnit = ({ userObject, profile }) => {
  // need to add in addFriend component
  return ( 
    <>
      <div className="userUnit-container">
        <img src={profile.picture} alt="User Icon" height={'80px'}/>
        <h4>{decodeEscapedData(profile.name)}</h4>
      </div>
    </>
   );
}
 
export default UserUnit;
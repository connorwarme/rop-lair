/* eslint-disable react/prop-types */

import AddFriend from "./AddFriend";
import PostUnit from "./PostUnit";
import icon from "../images/accountIcon.svg"

const Profile = ({ userObject, profile, posts }) => {

  return ( 
    <>            
    { profile && (
      <>
        <img src={profile.picture ? profile.picture : icon} style={{height: '120px'}}></img>
        <h1 className="profile-title">{profile.name}</h1>
        { (profile._id != userObject._id) && <AddFriend list={userObject.friend_list} setList={setList} profileId={profile._id} /> }

        { posts && (
            <div className="user-posts-">
            <h3>{profile.first_name}&#39;s Posts</h3>
              { posts.map(post => <PostUnit key={post._id} user={userObject} post={post} author={true}/> )}
            </div>
        )}
      </>
    )}
    </>
   );
}
 
export default Profile;
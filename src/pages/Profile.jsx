import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Connor Warme',
    photo: null,
    description: 'Me sleepy',
  })

  const handleClick = () => {
    const userCopy = { ...user }
    userCopy.name = 'Amity Warme',
    userCopy.description = 'I have energies!',
    setUser(userCopy)
  }
  return ( 
    <>
      <div className="profile-container">
        <div className="profile-content">
          <h1 className="profile-title">{user.name}</h1>
          <p className="description">{user.description}</p>
          <button onClick={handleClick}>Click me!</button>
        </div>
      </div>
    </>
   );
}
 
export default Profile;
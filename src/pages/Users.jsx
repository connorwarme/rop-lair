import { useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import UserUnit from "../components/UserUnit";
import errorIcon from "../images/icons/error.svg"
import custom from "../images/icons/custom2.svg"
import elves from "../images/gallery/wp-elves.jpg"
import "../styles/userListStyle.css"

const Users = ({ setBg }) => {

  const { userObject, setUserObject, access, makeHeader } = useContext(myContext)

  const url = 'https://rings-of-power.fly.dev/users/'
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  const { data, isLoading, error} = useFetch(url, auth)

  const setList = (array) => {
    const newObj = {...userObject}
    newObj.friend_list = array
    setUserObject(newObj)
  }
  setBg(elves)
  
  return ( 
    <div className="userlistDiv">
      { isLoading && (
        <div className='spinner-loading-container'>
              <img src={custom} />
              <p>Content is loading.</p>
        </div>  
      )}
      { !isLoading && !error && (
        <>
          <div className="user-list-container">
            <h1>Fellow Fans</h1>
            { (data && data.users) && (
              data.users.sort((a,b) => (a.family_name.toUpperCase() > b.family_name.toUpperCase()) ? 1 : ((b.family_name.toUpperCase() > a.family_name.toUpperCase()) ? -1 : 0 )).map(user => {
              {/* data.users.map(user => { */}
                return (
                  <>
                    <UserUnit key={user._id} userObject={userObject} profile={user} photo={user.photoImagePath ? user.photoImagePath : false} setList={setList} makeHeader={makeHeader} />
                  </>
                )
              })
            )}
          </div>
        </>
      )}
      { !isLoading && error && (
        <>
          <div className="user-list-error">
            <img src={errorIcon} />
            <p>Error! {error}</p>
          </div> 
        </>
        ) }
    </div>
   )
}
 
export default Users;
import { useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import UserUnit from "../components/UserUnit";
import errorIcon from "../images/icons/error.svg"
import custom from "../images/icons/custom2.svg"
import "../styles/userListStyle.css"

const Users = () => {

  const { userObject, setUserObject, access } = useContext(myContext)

  const url = 'http://localhost:3000/users/'
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
  
  return ( 
    <>
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
              data.users.map(user => {
                return (
                  <>
                    <UserUnit key={user._doc._id} userObject={userObject} profile={user._doc} photo={user.photoImagePath ? user.photoImagePath : false} setList={setList} />
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
    </>
   )
}
 
export default Users;
import { useContext } from "react";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";
import UserUnit from "../components/UserUnit";
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
      { isLoading && <h3>Page is loading...</h3> }
      { !isLoading && !error && (
        <>
          <div className="user-list-container">
            <h1>This is the User List page.</h1>
            { (data && data.users) && (
              data.users.map(user => {
                return (
                  <>
                    <UserUnit userObject={userObject} profile={user} setList={setList} />
                  </>
                )
              })
            )}
          </div>
        </>
      )}
      { !isLoading && error && (<p>Error! {error}</p>) }
    </>
   )
}
 
export default Users;
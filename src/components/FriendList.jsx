import useAxios from "../hooks/useAxios";
import decodeEscapedData from "../utility/escape";
import FriendName from "./FriendName";
import errorIcon from "../images/icons/error.svg"
import custom from "../images/icons/custom2.svg"
import "../styles/friendListStyle.css"

const FriendList = ({ username, listId, makeHeader, setLoading, userObject, setList }) => {

  // needs to be updated to friendlist/listId._id
  const url = `https://rings-of-power.fly.dev/friendlist/${'648f856814238c73acf5de51'}`
  const auth = { headers: makeHeader()}
  const { data, isLoading, error } = useAxios(url, auth)

  return ( 
    <>
      <div className="friend-list-container">
        <h4 className="friend-list-title">{decodeEscapedData(username)}&#39;s Friends</h4>
        <div className="friend-list-content">
          { isLoading && (!data || !data.friends) && (
            <>
              <div className='spinner-loading-container'>
                <img src={custom} />
                <p>Loading..</p>
              </div> 
            </>
            ) }
          { data && (
            <>
            { data.friends && (
              <>
                { data.friends.length == 0 && <p>No friends yet!</p> }
                { data.friends.length > 0 && (
                  <>
                    <ul>
                      { data.friends.map((friend, index) => (
                        <li key={index}>
                          <FriendName userid={friend} makeHeader={makeHeader} setLoading={setLoading} userObject={userObject} setList={setList} />
                        </li> 
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
            { (data.errors && !isLoading) && (
              <div className="friend-error-container">
                <img src={errorIcon}/>
                <p>{error}</p>
              </div>
            )}
            </>
          )}
          { (error && !isLoading) && (
            <div className="friend-error-container">
              <img src={errorIcon}/>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
   );
}
 
export default FriendList;
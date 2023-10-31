import useAxios from "../hooks/useAxios";
import decodeEscapedData from "../utility/escape";
import FriendName from "./FriendName";
import errorIcon from "../images/icons/error.svg"
import "../styles/friendListStyle.css"

const FriendList = ({ username, listId, makeHeader, setLoading, userObject, setList }) => {

  // needs to be updated to friendlist/listId._id
  const url = `http://localhost:3000/friendlist/${'648f856814238c73acf5de51'}`
  const auth = { headers: makeHeader()}
  const { data, isLoading, error } = useAxios(url, auth)

  return ( 
    <>
      <div className="friend-list-container">
        <div className="friend-list-title">{decodeEscapedData(username)}&#39;s Friends</div>
        <div className="friend-list-content">
          { isLoading && <p>Content is loading.</p> }
          { data && (
            <>
            { data.friends && (
              <>
                { data.friends.length == 0 && <p>No friends yet!</p> }
                { data.friends.length > 0 && (
                  <>
                    <ul>
                      { data.friends.map(friend => (
                        <li key={friend._id}>
                          <FriendName userid={friend} makeHeader={makeHeader} setLoading={setLoading} userObject={userObject} setList={setList} />
                        </li> 
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
            { data.errors && (
              <div className="friend-error-container">
                <img src={errorIcon}/>
                <p>{error}</p>
              </div>
            )}
            </>
          )}
          { error && (
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
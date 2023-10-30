import useAxios from "../hooks/useAxios";
import decodeEscapedData from "../utility/escape";
import FriendName from "./FriendName";

const FriendList = ({ username, listId, makeHeader }) => {

  const fakeid = '648f856814238c73acf5de51'
  const url = `http://localhost:3000/friendlist/${fakeid}`
  const auth = { headers: makeHeader()}
  const { data, isLoading, error } = useAxios(url, auth)


  const list = ['Amy', 'Bob', 'Luke']

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
                      { data.friends.map(friend => <li key={friend._id}><FriendName userid={friend} makeHeader={makeHeader} /></li> )}
                    </ul>
                  </>
                )}
              </>
            )}
            { data.errors && (
              <div className="errors-container">
                <h4>Error Loading Friends</h4>
                <div>{data.errors[0].msg}</div> 
              </div>
            )}
            </>
          )}
          { error && (
            <div className="errors-container">
              <h4>Error Loading Friends</h4>
              <div>{error}</div>
            </div>
          )}
          { list.length == 0 && <p>No friends yet!</p> }
          { list.length > 0 && (
            <>
              <ul>
                { list.map(index => <li key={index}>{index}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
   );
}
 
export default FriendList;
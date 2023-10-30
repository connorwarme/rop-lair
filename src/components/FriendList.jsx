import decodeEscapedData from "../utility/escape";

const FriendList = ({ username }) => {

  const list = ['Amy', 'Bob', 'Luke']

  return ( 
    <>
      <div className="friend-list-container">
        <div className="friend-list-title">{decodeEscapedData(username)}&#39;s Friends</div>
        <div className="friend-list-content">
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
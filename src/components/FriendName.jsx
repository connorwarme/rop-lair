import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import AddFriend from "./AddFriend";
import decodeEscapedData from "../utility/escape";
import icon from "../images/icons/account.svg"
import errorIcon from "../images/icons/error.svg"

const FriendName = ({ userid, makeHeader, setLoading, userObject, setList }) => {
  const url = `http://localhost:3000/getuser/${userid}`
  const auth = {
    headers: makeHeader()
  }
  const { data, isLoading, error } = useAxios(url, auth)

  const handleClick = () => {
    setLoading(true)
    window.scrollTo(0, 0)
  }
  const isLoadingFake=true

  return ( 
    <>
      { isLoading && (!data || !data.user) && (
        <>
          <div className="friend-name-container">
            <div className="friend-name-loading">
              <span className="friend-loader-element"></span>
              <span className="friend-loader-element"></span>
              <span className="friend-loader-element"></span>
            </div>
          </div> 
        </>
      )}
      { data && (
        <>
          { data.user && (
            <>
              <div className="friend-name-container">
                <Link to={`/profile/${data.user._id}`} onClick={handleClick} className="friend-name-link">
                  { data.photoPath && <img src={data.photoPath} /> }
                  { !data.photoPath && <img src={icon} className="account-icon"/> }
                  <p>{decodeEscapedData(data.user.name)}</p>
                </Link>
                <AddFriend list={userObject.friend_list} setList={setList} profileId={data.user._id} full={false}/>
              </div>
            </>
          )}
          { (data.errors && !isLoading) && <div className="friend-error-container"><img src={errorIcon}/><p>{data.errors[0].msg}</p></div> }
        </>
      )}
      { (error && !isLoading) && <div className="friend-error-container"><img src={errorIcon}/><p>{error}</p></div> }
    </>
   );
}
 
export default FriendName;
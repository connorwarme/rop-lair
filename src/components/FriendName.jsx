import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import decodeEscapedData from "../utility/escape";
import icon from "../images/icons/account.svg"
import errorIcon from "../images/icons/error.svg"

const FriendName = ({ userid, makeHeader, setLoading }) => {
  const url = `http://localhost:3000/getuser/${userid}`
  const auth = {
    headers: makeHeader()
  }
  const { data, isLoading, error } = useAxios(url, auth)

  const handleClick = () => {
    setLoading(true)
    window.scrollTo(0, 0)
  }
  return ( 
    <>
      { isLoading && <div>User info is loading...</div> }
      { data && (
        <>
          { data.user && (
            <>
              <Link to={`/profile/${data.user._id}`} onClick={handleClick} className="friend-name-link">
                <img src={data.photoPath ? data.photoPath : icon} />
                { data && console.log(data.photoPath) }
                <p>{decodeEscapedData(data.user.name)}</p>
              </Link>
            </>
          )}
          { data.errors && <div className="friend-error-container"><img src={errorIcon}/><p>{data.errors[0].msg}</p></div> }
        </>
      )}
      { error && <div className="friend-error-container"><img src={errorIcon}/><p>{error}</p></div> }
    </>
   );
}
 
export default FriendName;
/* eslint-disable react/prop-types */
import useAxios from "../hooks/useAxios";
import icon from "../images/icons/accountIcon.svg"
import custom from "../images/icons/custom2.svg"

const UserPhoto = ({ userId, makeHeader }) => {
  const url = `https://rings-of-power.fly.dev/userphoto/${userId}`
  const auth = {
    headers: makeHeader()
  }

  const { data, isLoading, error } = useAxios(url, auth)

  return ( 
    <>
      <div className="userUnit-photoContainer">
       { !isLoading && (
        <>
          { data && data.photoPath && (
            <img src={data.photoPath} alt="Icon"  />
          )}
          { ((data && !data.photoPath) || error) && (
            <img src={icon} alt="Icon" className="account-icon" />
          )}
        </>
       )}
       { isLoading && (
        <>
          <div className='spinner-loading-photo-container'>
            <img src={custom} />
          </div>
        </>
       )}
      </div>
    </>
   );
}
 
export default UserPhoto;
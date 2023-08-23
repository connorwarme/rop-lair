import { useContext } from "react";
import { useParams } from "react-router-dom";
import { myContext } from "../contexts/Context";
import useFetch from "../hooks/useFetch";

const OtherProfile = () => {
  const { id } = useParams()
  const { access } = useContext(myContext)

  const url = 'http://localhost:3000/profile' + id
  const auth = {
    headers: {
      "Authorization": `Bearer ${access}`
    }
  }
  const { data, isLoading, error } = useFetch(url, auth)
  // any other profile (besides the user)
  // need to fetch data from backend


  return ( 
    <>

    </> 
  );
}
 
export default OtherProfile;
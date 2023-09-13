import axios from "axios";
import { useState } from "react";

const Mock = () => {
  const [mime, setMime] = useState(null)
  const [buffer, setBuffer] = useState(null)

  const url = "https://avatars.githubusercontent.com/u/698003?v=4"

  axios({
    url, 
    method: 'GET',
    responseType: 'arraybuffer',
  })
  .then(res => {
    console.log(res.data)
    // const littleBuffer = Buffer.from(res.data, 'binary')
    setTimeout(setMime(getMimeTypeFromArrayBuffer(res.data)), 5000)
    // setBuffer(littleBuffer)
  })
  
  function getMimeTypeFromArrayBuffer(arrayBuffer) {
    const uint8arr = new Uint8Array(arrayBuffer)
    console.log('firing mime type fn')
    const len = 4
    if (uint8arr.length >= len) {
      let signatureArr = new Array(len)
      for (let i = 0; i < len; i++)
        signatureArr[i] = (new Uint8Array(arrayBuffer))[i].toString(16)
      const signature = signatureArr.join('').toUpperCase()
      console.log(signature)
      switch (signature) {
        case '89504E47':
          return 'image/png'
        case '47494638':
          return 'image/gif'
        case 'FFD8FFDB':
        case 'FFD8FFE0':
          return 'image/jpeg'
        default:
          return null
      }
    }
    return null
  }


  return ( 
    <>
      { buffer && console.log(buffer)}
      { mime && <p>{mime}</p>}
    </>
   );
}
 
export default Mock;
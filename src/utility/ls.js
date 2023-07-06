// local storage helper functions

const saveObject = (obj, key) => {
  if (obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  }
}

const returnObject = (key) => {
  const token = localStorage.getItem(key);
  if (token === undefined) {
    return null
  }
  return JSON.parse(localStorage.getItem(key))
}

const clearStorage = (key) => {
  localStorage.removeItem(key)
}


// // copied from other project, need to adapt accordingly
// const ls = (() => {
//   // these work for both objectArray and projectArray
//   // take the array, stringify, and save it locally
//   const saveArray = (array, key) => {
//       // need to stringify data
//       let data = JSON.stringify(array);
//       // save to local
//       localStorage.setItem(key, data);
//   }
//   const updateArrays = (array1, array2) => {
//       saveArray(array1, "obj");
//       saveArray(array2, "proj");
//   }
//   // get the local data, parse it, and return the array
//   const returnArray = (key) => {
//       let arrayString = localStorage.getItem(key);
//       let regularArray = JSON.parse(arrayString);
//       return regularArray;
//   }
//   // check local storage for "key" content
//   const checkContent = (key) => {
//       let content = returnArray(key);
//       if (content == null || content[0] == undefined) {
//           return false;
//       } else {
//           return content;
//       }
//   }
//   // clear the local storage
//   const clear = () => {
//       localStorage.removeItem("obj");
//       localStorage.removeItem("proj");
//   }
//   return { saveArray, updateArrays, returnArray, checkContent, clear }
// })();
// check to see if local storage is supported and available
// not sure if this is necessary...?
// definitely if I needed to support older browsers, but I doubt many folks will visit the page
const storageAvailable = (type) => {
  let storage;
  try {
      storage = window[type];
      const value = '__storage_test__';
      storage.setItem(value, value);
      storage.removeItem(value);
      return true;
  }
  catch (e) {
      return (e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === `QuotaExceededError` || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0));
  }
  }

export { saveObject, returnObject, clearStorage, storageAvailable }
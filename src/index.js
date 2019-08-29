/** 
  * @desc Allows developers to reference browser local/session storage without having to stringify or parse their object types.
  * @author Tyler Drake tylerdrake44@gmail.com
*/

/**
  * @desc gets objects from local storage
  * @param string object - the name of the object to be retrieved
  * @param bool sessionFallback - determines if should retrieve from session storage if local storage is unavailable
  * @return string/object - either a string if the local storage object is not parsable or an object if it can be parsed
*/
exports.getFromLocalStorage = (object, sessionFallback = false) => {
  let storageObject
  try {
    storageObject = localStorage.getItem(object)
    return parseStorageObject(storageObject)
  } catch (e) {
    if (sessionFallback) {
      storageObject = sessionStorage.getItem(object)
      return parseStorageObject(storageObject)
    }
  }
}

/**
  * @desc gets objects from session storage
  * @param string object - the name of the object to be retrieved
  * @return string/object - either a string if the session storage object is not parsable or an object if it can be parsed
*/
exports.getFromSessionStorage = object => {
  let storageObject
  storageObject = sessionStorage.getItem(object)
  return parseStorageObject(storageObject)
}

/**
  * @desc attempts to parse any object passed in
  * @param object object - the object to attempt to parse
  * @return string/object - either a string if object is not parsable or an object if it can be parsed
*/
const parseStorageObject = object => {
  if (object) {
    let objOut
    try {
      objOut = JSON.parse(object)
    } catch {
      objOut = object
    }
    return objOut
  }
}
exports.parseStorageObject = parseStorageObject

/**
  * @desc attempts to save an object to local storage
  * @param string name - the name of the object to store
  * @param object object - the object to store
  * @param bool sessionFallback - determines if should store to session storage if local storage is unavailable
  * @return string/object - either a string if object is not parsable or an object if it can be parsed
*/
exports.saveToLocalStorage = (name, object, sessionFallback = false) => {
  const objectToStore = typeof object !== 'string' ? JSON.stringify(object) : object
  try {
    localStorage.setItem(name, objectToStore)
  } catch (e) {
    if (sessionFallback) {
      sessionStorage.setItem(name, objectToStore)
    }
  }
}

/**
  * @desc attempts to save an object to session storage
  * @param string name - the name of the object to store
  * @param object object - the object to store
  * @return string/object - either a string if object is not parsable or an object if it can be parsed
*/
exports.saveToSessionStorage = (name, object) => {
  const objectToStore = typeof object !== 'string' ? JSON.stringify(object) : object
  sessionStorage.setItem(name, objectToStore)
}

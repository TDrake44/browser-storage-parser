[![Build Status](https://api.travis-ci.com/TDrake44/browser-storage-parser.svg?branch=master)](https://travis-ci.com/TDrake44/browser-storage-parser) [![Coverage Status](https://coveralls.io/repos/github/TDrake44/browser-storage-parser/badge.svg?branch=v0.0.1)](https://coveralls.io/github/TDrake44/browser-storage-parser?branch=master)

# browser-storage-parser
Provides a helper to save to and retrieve objects and strings from the browser's sessionStorage and localStorage.

## Install
```
npm install browser-storage-parser
```

## Motivation
When an application makes extensive use of browser storage, several calls are made to storage `getItem` and `setItem`. This is fine, until there is a need to store more than a simple string. For example, if a JSON object needs to be stored, it must be stringified upon `setItem` and then parsed upon `getItem`. This library takes care of that for you.

There are also situations where localStorage may not be available. This library allows for using sessionStorage as a fallback in these scenarios.

## Usage

### saveToSessionStorage
No matter the object type of the input, it will store as a string in sessionStorage.
This prevents the need for `sessionStorage.setItem("objectName", JSON.stringify({ key: "value" }))`

Examples:
```
saveToSessionStorage("objectName", "string storage")
```
-- or --
```
saveToSessionStorage("objectName", {key: "value"})
```
---
### getFromSessionStorage
Will attempt to parse the item being retrieved and will either return as a string or object.
This prevents the need for  `JSON.parse(sessionStorage.getItem("objectName")` and takes care of null checking.
Example:
```
getFromSessionStorage('objectName`)
```
**Values returned:**
```"string stored"```
-- or --
```
{
  key: "value",
  key2: "value2"
}
```

---
### saveToLocalStorage
No matter the object type of the input, it will store as a string in localStorage.
This prevents the need for `localStorage.setItem("objectName", JSON.stringify({ key: "value" }))`

Examples:
```
saveToLocalStorage("objectName", "string storage")
```
-- or --
```
saveToLocalStorage("objectName", {key: "value"})
```
**Optional third parameter: `sessionFallback`**
 If localStorage is unavailable, sessionStorage can be used as a fallback.
Defaults to `false`, Example: 
```
saveToLocalStorage("objectName", {key: "value"}, true)
```

---
### getFromLocalStorage

Will attempt to parse the item being retrieved and will either return as a string or object.
This prevents the need for  `JSON.parse(localStorage.getItem("objectName")` and takes care of null checking.
Example:
```
getFromLocalStorage('objectName`)
```
**Values returned:**
`"string stored"`
-- or --
```
{
  key: "value",
  key2: "value2"
}
```
**Optional third parameter: `sessionFallback`**
 If localStorage is unavailable, sessionStorage can be used as a fallback.
Defaults to `false`, Example: 
```
getFromLocalStorage("objectName", true)
```

---

const keyUserString = localStorage.getItem('keyUser')
const keyUser = JSON.parse(keyUserString)

const setLocalStorage = function(token, role) {
  let keyUser = { token, role };
  localStorage.setItem("keyUser", JSON.stringify(keyUser));
}

module.exports = { keyUser, setLocalStorage }
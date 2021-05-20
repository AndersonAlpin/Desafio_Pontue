const setLocalStorage = (token, role, aluno_id) => {
  let userKey = { token, role, aluno_id };
  localStorage.setItem("userKey", JSON.stringify(userKey));
}

module.exports = { setLocalStorage }
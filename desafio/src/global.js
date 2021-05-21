const setLocalStorage = (token, role, aluno_id) => {
  let userKey = { token, role, aluno_id };
  localStorage.setItem("userKey", JSON.stringify(userKey));
}

const dateFormat = (date_created) => {
  let data = new Date(date_created),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  let hora = data.getHours();
  let minuto = data.getMinutes();
  return `${diaF}/${mesF}/${anoF} às ${hora}:${minuto}`;
}

module.exports = { setLocalStorage, dateFormat }
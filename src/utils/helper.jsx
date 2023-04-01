
export function getUserData() {
  return JSON.parse(localStorage.getItem("userData"));
}

export function setUserData(value) {
  localStorage.setItem("userData", JSON.stringify(value));
}

export function mergeUserState(value) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const mergedData = {...userData, ...value};
  localStorage.setItem("userData", JSON.stringify(mergedData));
}

export function getToken() {
  return getUserData().token;
}

export function insertString(main_string, ins_string, pos) {
  if(typeof(pos) == "undefined") {
    pos = 0;
  }
  if(typeof(ins_string) == "undefined") {
    ins_string = '';
  }
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}

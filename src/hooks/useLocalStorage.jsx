import { useState } from "react";

const user = JSON.parse(localStorage.getItem("userData"));

export function useLocalStorage() {
  const [userData, setUserData] = useState(user);

  function setData(value) {
    localStorage.setItem("userData", JSON.stringify(value));
    setUserData(value);
  }

  return [userData, setData];
}

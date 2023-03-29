import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function useToken() {
  const { userData } = useContext(UserContext);
  return userData.token;
}

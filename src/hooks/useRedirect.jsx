import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useRedirect(data, route) {
  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate(route);
  }, []);
}

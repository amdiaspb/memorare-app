import { useAsync } from "../hooks/useAsync";
import { getToken } from "../utils/helper";
import { api } from "./api";

export function useGetWorkshopSession() {
  const req = (deckId) => {
    const url = "/workshop/" + deckId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function useUpsertWorkshopSession() {
  const req = (deckId, stateObj) => {
    const url = "/workshop";
    const body = { deckId, stateObj };
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, body, config);
  }

  return useAsync(req, false);
}

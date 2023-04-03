import { useAsync } from "../hooks/useAsync";
import { getToken } from "../utils/helper";
import { api } from "./api";

export function useGetDecks() {
  const req = (all = true) => {
    const url = all ? "/decks" : "/decks/user";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function useGetDeckById() {
  const req = (deckId) => {
    const url = "/decks/" + deckId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function useCreateDeck() {
  const req = () => {
    const url = "/decks";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, {}, config);
  }

  return useAsync(req, false);
}

export function usePatchDeck() {
  const req = (deckId, obj) => {
    const url = "/decks/" + deckId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.patch(url, obj, config);
  }

  return useAsync(req, false);
}

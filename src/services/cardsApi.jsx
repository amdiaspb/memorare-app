import { useAsync } from "../hooks/useAsync";
import { getToken } from "../utils/helper";
import { api } from "./api";

export function useGetCardById() {
  const req = (cardId) => {
    const url = "/cards/" + cardId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function useGetCardsInfoByDeckId() {
  const req = (deckId) => {
    const url = "/cards/deck/" + deckId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function usePatchCard() {
  const req = (cardId, obj) => { // { front, back }
    const url = "/cards/" + cardId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.patch(url, obj, config);
  }

  return useAsync(req, false);
}

export function useCreateCard() {
  const req = (deckId) => {
    const url = "/cards";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, { deckId }, config);
  }

  return useAsync(req, false);
}

export function useDeleteCard() {
  const req = (cardId) => {
    const url = "/cards/" + cardId;
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.delete(url, config);
  }

  return useAsync(req, false);
}

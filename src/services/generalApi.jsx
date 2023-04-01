import { useAsync } from "../hooks/useAsync";
import { getToken } from "../utils/helper";
import { api } from "./api";

export function useGetStudies() {
  const req = () => {
    const url = "studies";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.get(url, config);
  }

  return useAsync(req, false);
}

export function useCreateStudy() {
  const req = (snapshotId) => {
    const url = "/study";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, { snapshotId }, config);
  }

  return useAsync(req, false);
}

export function useCreateStudySession() {
  const req = (studyId) => {
    const url = "/studies/session";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, {studyId}, config);
  }

  return useAsync(req, false);
}

export function usePatchStudySession() {
  const req = (studyId, data) => {
    const url = "/studies/session";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.patch(url, {studyId, data}, config);
  }

  return useAsync(req, false);
}

export function useGetStudySession() {
  const req = (studyId) => {
    const url = "/studies/session";
    const token = getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(url, {studyId}, config);
  }

  return useAsync(req, false);
}

export function useGetCardsByDeckId() {
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

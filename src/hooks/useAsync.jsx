import { useState, useEffect } from "react";

export function useAsync(handler, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  async function act(...args) {
    setLoading(true);

    try {
      const response = await handler(...args);
      setData(response?.data);
      setError(null);
    } catch (err) {
      setError(err.response);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (immediate) execute();
  }, []);

  return { data, loading, error, act };
}

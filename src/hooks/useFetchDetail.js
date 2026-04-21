// hooks/useFetchDetail.js
import { useState, useEffect } from "react";
import API from "../api/axios";

const cache = new Map();

export default function useFetchDetail(url) {
  const [data, setData] = useState(() => cache.get(url) ?? null);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    setLoading(true);
    API.get(url)
      .then((res) => {
        // For single item, just return the data directly
        cache.set(url, res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
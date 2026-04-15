// hooks/useFetch.js
import { useState, useEffect } from "react";
import API from "../api/axios";

const cache = new Map(); // module-level cache persists across renders

export default function useFetch(url) {
  const [data, setData]       = useState(cache.get(url) ?? []);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (cache.has(url)) return; // skip if already fetched

    API.get(url)
      .then((res) => {
        const result = Array.isArray(res.data) ? res.data : res.data?.results ?? [];
        cache.set(url, result);
        setData(result);
      })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
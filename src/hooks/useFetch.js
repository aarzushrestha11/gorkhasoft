import { useState, useEffect } from "react";
import API from "../api/axios";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(url)
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : res.data?.results || []);
      })
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
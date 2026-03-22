import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/logs");
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const clearLogs = async () => {
    await api.delete("/logs");
    setLogs([]);
  };

  return { logs, loading, fetchLogs, clearLogs };
};

export default useLogs;
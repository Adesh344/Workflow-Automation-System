import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const useWorkflows = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/workflows");
      setWorkflows(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch workflows");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWorkflows(); }, [fetchWorkflows]);

  const createWorkflow = async (payload) => {
    const { data } = await api.post("/workflows", payload);
    setWorkflows((prev) => [data, ...prev]);
    return data;
  };

  const updateWorkflow = async (id, payload) => {
    const { data } = await api.put(`/workflows/${id}`, payload);
    setWorkflows((prev) => prev.map((w) => (w._id === id ? data : w)));
    return data;
  };

  const deleteWorkflow = async (id) => {
    await api.delete(`/workflows/${id}`);
    setWorkflows((prev) => prev.filter((w) => w._id !== id));
  };

  return { workflows, loading, error, fetchWorkflows, createWorkflow, updateWorkflow, deleteWorkflow };
};

export default useWorkflows;
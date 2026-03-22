import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = async (payload) => {
    const { data } = await api.post("/tasks", payload);
    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, payload) => {
    const { data } = await api.put(`/tasks/${id}`, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
};

export default useTasks;
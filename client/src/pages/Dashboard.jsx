import { useState } from "react";
import Navbar from "../components/Navbar";
import TaskList from "../components/tasks/TaskList";
import WorkflowList from "../components/workflows/WorkflowList";
import LogList from "../components/logs/LogList";
import useTasks from "../hooks/useTasks";
import useWorkflows from "../hooks/useWorkflows";
import useLogs from "../hooks/useLogs";

const TABS = ["Tasks", "Workflows", "Logs"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Tasks");
  const tasks = useTasks();
  const workflows = useWorkflows();
  const logs = useLogs();

  
  const createTask = async (form) => {
    await tasks.createTask(form);
    await logs.fetchLogs();
  };
  const updateTask = async (id, form) => {
    await tasks.updateTask(id, form);
    await logs.fetchLogs();
  };

  const stats = [
    { label: "Tasks", value: tasks.tasks.length, color: "text-indigo-400" },
    { label: "Workflows", value: workflows.workflows.length, color: "text-emerald-400" },
    { label: "Active", value: workflows.workflows.filter((w) => w.isActive).length, color: "text-blue-400" },
    { label: "Log Entries", value: logs.logs.length, color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {activeTab === "Tasks" && (
            <TaskList
              tasks={tasks.tasks}
              loading={tasks.loading}
              createTask={createTask}
              updateTask={updateTask}
              deleteTask={tasks.deleteTask}
            />
          )}
          {activeTab === "Workflows" && (
            <WorkflowList
              workflows={workflows.workflows}
              loading={workflows.loading}
              createWorkflow={workflows.createWorkflow}
              updateWorkflow={workflows.updateWorkflow}
              deleteWorkflow={workflows.deleteWorkflow}
            />
          )}
          {activeTab === "Logs" && (
            <LogList
              logs={logs.logs}
              loading={logs.loading}
              fetchLogs={logs.fetchLogs}
              clearLogs={logs.clearLogs}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
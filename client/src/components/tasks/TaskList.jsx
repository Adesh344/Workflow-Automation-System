import { useState } from "react";
import TaskModal from "./TaskModal";

const statusStyles = {
  pending: "bg-yellow-900/50 text-yellow-300 border-yellow-800",
  in_progress: "bg-blue-900/50 text-blue-300 border-blue-800",
  completed: "bg-green-900/50 text-green-300 border-green-800",
};
const statusLabel = { pending: "Pending", in_progress: "In Progress", completed: "Completed" };

const TaskList = ({ tasks, loading, createTask, updateTask, deleteTask }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleCreate = async (form) => { await createTask(form); };
  const handleUpdate = async (form) => { await updateTask(editData._id, form); };

  const openEdit = (t) => { setEditData(t); setModalOpen(true); };
  const openCreate = () => { setEditData(null); setModalOpen(true); };

  const cycleStatus = async (task) => {
    const order = ["pending", "in_progress", "completed"];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    await updateTask(task._id, { status: next });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Tasks</h2>
          <p className="text-gray-500 text-sm mt-1">{tasks.length} task{tasks.length !== 1 ? "s" : ""} total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No tasks yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task._id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
              <button onClick={() => cycleStatus(task)} className="flex-shrink-0" title="Click to cycle status">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === "completed" ? "bg-green-500 border-green-500" : task.status === "in_progress" ? "border-blue-400" : "border-gray-600"}`}>
                  {task.status === "completed" && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>

              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${task.status === "completed" ? "text-gray-500 line-through" : "text-white"}`}>{task.title}</p>
                {task.description && <p className="text-gray-500 text-xs mt-0.5 truncate">{task.description}</p>}
              </div>

              <span className={`text-xs px-2.5 py-1 rounded-full border flex-shrink-0 ${statusStyles[task.status]}`}>
                {statusLabel[task.status]}
              </span>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => openEdit(task)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => deleteTask(task._id)} className="text-gray-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editData ? handleUpdate : handleCreate}
        editData={editData}
      />
    </div>
  );
};

export default TaskList;
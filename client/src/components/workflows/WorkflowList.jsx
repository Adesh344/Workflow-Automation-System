import { useState } from "react";
import WorkflowModal from "./WorkflowModal";

const triggerLabel = { task_created: "Task Created", task_updated: "Task Updated" };
const actionLabel = { log_message: "Log Message", save_to_db: "Save to DB" };

const WorkflowList = ({ workflows, loading, createWorkflow, updateWorkflow, deleteWorkflow }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleCreate = async (form) => { await createWorkflow(form); };
  const handleUpdate = async (form) => { await updateWorkflow(editData._id, form); };
  const handleToggle = async (w) => { await updateWorkflow(w._id, { isActive: !w.isActive }); };

  const openEdit = (w) => { setEditData(w); setModalOpen(true); };
  const openCreate = () => { setEditData(null); setModalOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Workflows</h2>
          <p className="text-gray-500 text-sm mt-1">{workflows.length} workflow{workflows.length !== 1 ? "s" : ""} configured</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Workflow
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : workflows.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No workflows yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {workflows.map((w) => (
            <div key={w._id} className={`bg-gray-800 border rounded-xl p-4 transition-all ${w.isActive ? "border-gray-700" : "border-gray-800 opacity-60"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${w.isActive ? "bg-green-400" : "bg-gray-600"}`} />
                    <p className="text-white font-semibold truncate">{w.name || "Untitled Workflow"}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-indigo-900/60 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-800">
                      IF: {triggerLabel[w.trigger]}
                    </span>
                    <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800">
                      THEN: {actionLabel[w.action]}
                    </span>
                  </div>
                  {w.message && <p className="text-gray-500 text-xs mt-2 truncate">"{w.message}"</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleToggle(w)} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${w.isActive ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-700 hover:bg-gray-600 text-gray-400"}`}>
                    {w.isActive ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => openEdit(w)} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => deleteWorkflow(w._id)} className="text-gray-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <WorkflowModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editData ? handleUpdate : handleCreate}
        editData={editData}
      />
    </div>
  );
};

export default WorkflowList;
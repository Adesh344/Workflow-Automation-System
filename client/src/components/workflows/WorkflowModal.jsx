import { useState, useEffect } from "react";

const TRIGGERS = [
  { value: "task_created", label: "Task Created" },
  { value: "task_updated", label: "Task Updated" },
];
const ACTIONS = [
  { value: "log_message", label: "Log a Message" },
  { value: "save_to_db", label: "Save Entry to DB" },
];

const WorkflowModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [form, setForm] = useState({ name: "", trigger: "task_created", action: "log_message", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setForm({ name: editData.name || "", trigger: editData.trigger, action: editData.action, message: editData.message || "" });
    } else {
      setForm({ name: "", trigger: "task_created", action: "log_message", message: "" });
    }
    setError("");
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) { setError("Message is required"); return; }
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md mx-4 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">{editData ? "Edit Workflow" : "New Workflow"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Workflow Name</label>
            <input
              type="text"
              placeholder="e.g. Notify on task create"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Trigger (IF)</label>
            <select
              value={form.trigger}
              onChange={(e) => setForm({ ...form, trigger: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {TRIGGERS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Action (THEN)</label>
            <select
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {ACTIONS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Message</label>
            <input
              type="text"
              placeholder='e.g. New task "{task_title}" was created!'
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <p className="text-gray-600 text-xs mt-1">Tip: use <code className="text-indigo-400">{"{task_title}"}</code> as a placeholder</p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg py-2.5 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg py-2.5 font-semibold transition-colors">
              {loading ? "Saving..." : editData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkflowModal;
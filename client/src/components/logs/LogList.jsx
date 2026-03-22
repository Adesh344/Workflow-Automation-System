const LogList = ({ logs, loading, fetchLogs, clearLogs }) => {
  const handleClear = async () => {
    if (window.confirm("Clear all logs?")) await clearLogs();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">Execution Logs</h2>
          <p className="text-gray-500 text-sm mt-1">{logs.length} log entr{logs.length !== 1 ? "ies" : "y"}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchLogs} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-xl transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          {logs.length > 0 && (
            <button onClick={handleClear} className="flex items-center gap-2 bg-red-900/40 hover:bg-red-900/60 text-red-400 px-4 py-2.5 rounded-xl transition-colors text-sm border border-red-900">
              Clear All
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse" />)}</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No logs yet. Trigger a workflow by creating or updating a task.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log._id} className={`rounded-xl p-4 border font-mono text-sm ${log.status === "success" ? "bg-gray-800/80 border-gray-700" : "bg-red-900/20 border-red-900"}`}>
              <div className="flex items-center gap-3 mb-1">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${log.status === "success" ? "bg-green-400" : "bg-red-400"}`} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${log.status === "success" ? "text-green-400" : "text-red-400"}`}>{log.status}</span>
                <span className="text-gray-600 text-xs">·</span>
                <span className="text-gray-500 text-xs">{log.trigger} → {log.action}</span>
                <span className="text-gray-600 text-xs ml-auto">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-300 pl-5">{log.output}</p>
              {log.workflowId && (
                <p className="text-gray-600 text-xs pl-5 mt-1">Workflow: {log.workflowId?.name || log.workflowId}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogList;
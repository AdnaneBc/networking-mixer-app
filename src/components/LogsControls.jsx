const LogsControls = ({ clearLogs, showLogsHandler, showLogs }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button className="bg-blue-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
        Download Log
      </button>
      <button
        onClick={clearLogs}
        className="bg-orange-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-500 transition"
      >
        Clear Log
      </button>
      <button
        onClick={showLogsHandler}
        className="bg-red-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-500 transition"
      >
        {showLogs ? "Hide Log" : "Show Log"}
      </button>
    </div>
  );
};

export default LogsControls;

import React, { useEffect, useState } from 'react';
import './style.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [filename, setFilename] = useState('last-run-logging');

  useEffect(() => {
    fetch(`https://ml.nawras.ai/ai_cases/logs/${filename}`)
      .then((response) => response.json())
      .then((data) => setLogs(data.logs))
      .catch((error) => console.error('Error fetching logs:', error));
  }, [filename]);

  return (
    <div className="App container">
      <header className="my-4">
        <h1>Log Viewer</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Enter log filename"
          />
        </div>
        <div className="logs">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`log-entry ${log.level.toLowerCase()} p-2 border-bottom`}
            >
              <span className="timestamp">{log.timestamp}</span>
              <span className="level mx-2">{log.level}</span>
              <span className="message">{log.message}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

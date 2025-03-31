import React from "react";
import styles from "./QueryHistory.module.css";

const QueryHistory = ({ queryHistory }) => {
  const handleDownload = (format) => {
    if (queryHistory.length === 0) {
      alert("No queries to download!");
      return;
    }

    let fileContent = queryHistory
      .map((entry) => `-- Executed at: ${entry.time}\n${entry.query}\n`)
      .join("\n");

    const fileBlob = new Blob([fileContent], {
      type: format === "sql" ? "application/sql" : "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(fileBlob);
    link.download = `query_history.${format}`;
    link.click();
  };

  return (
    <div className={styles.queryHistoryContainer}>
      <h3>Query History</h3>
      <ul>
        {queryHistory.map((entry, index) => (
          <li key={index}>
            <p>{entry.time}</p>
            <pre>{entry.query}</pre>
          </li>
        ))}
      </ul>
      <div className={styles.downloadButtons}>
        <button onClick={() => handleDownload("txt")}>📜 Download .TXT</button>
        <button onClick={() => handleDownload("sql")}>🗄️ Download .SQL</button>
      </div>
    </div>
  );
};

export default QueryHistory;

import React, { useState } from "react";
import { FileText, Database } from "lucide-react";
import styles from "./QueryHistory.module.css";

const QueryHistory = ({ queryHistory }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const handleDownload = (format) => {
    if (queryHistory.length === 0) {
      setToastMessage({ message: "No queries to download!", type: "error" });
      setTimeout(() => setToastMessage(null), 3000);
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

    setToastMessage({ message: `${format.toUpperCase()} Downloaded Successfully!`, type: "success" });
    setTimeout(() => setToastMessage(null), 3000);
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
        <button onClick={() => handleDownload("txt")}>
          <FileText className="w-4 h-4 mr-2" /> Download .TXT
        </button>
        <button onClick={() => handleDownload("sql")}>
          <Database className="w-4 h-4 mr-2" /> Download .SQL
        </button>
      </div>

      {toastMessage && (
        <div className={`${styles.toast} ${styles[toastMessage.type]}`}>
          {toastMessage.message}
        </div>
      )}
    </div>
  );
};

export default QueryHistory;

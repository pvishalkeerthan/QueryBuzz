import React, { useEffect } from "react";
import styles from "./QueryResult.module.css";
import { FileJson, FileSpreadsheet } from "lucide-react";

const QueryResult = ({ activeTab, tabs }) => {
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || {};
  const queryResult = activeTabData.result || [];

  const rowCount = queryResult.length;
  const columnCount = rowCount > 0 ? Object.keys(queryResult[0]).length : 0;

  const downloadCSV = () => {
    const headers = Object.keys(queryResult[0]);
    const rows = queryResult.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)).join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = 'query_result.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(queryResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = 'query_result.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        downloadCSV();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [queryResult]);

  return (
    <div className={styles.resultContainer}>
      <h3>Query Result</h3>
      {queryResult.length > 0 && (
        <div className={styles.stats}>
          <p>Rows: {rowCount}</p>
          <p>Columns: {columnCount}</p>
        </div>
      )}
      {queryResult.length === 0 ? (
        <p>Execute a query to see result here</p>
      ) : (
        <>
          <div className={styles.downloadButtons}>
            <button className={`${styles.downloadButton} ${styles.csvButton}`} onClick={downloadCSV}>
              <FileSpreadsheet /> Download as CSV
            </button>
            <button className={`${styles.downloadButton} ${styles.jsonButton}`} onClick={downloadJSON}>
              <FileJson /> Download as JSON
            </button>
          </div>
          <table className={styles.resultTable}>
            <thead>
              <tr>
                {Object.keys(queryResult[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(queryResult) &&
                queryResult.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default QueryResult;

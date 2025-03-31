import { useEffect, useState, useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play, Code2, Copy } from "lucide-react";
import sqlFormatter from "../../utils/sqlFormatter";
import styles from "./QueryInput.module.css";
import mockDatabase from "../../database/mockDatabase";
import QueryDropDown from "../QueryDropDown/QueryDropDown";
import TabManager from "../TabManager/TabManager";

const QueryInput = ({ activeTab, tabs = [], updateQuery, updateResult, setTabs, setActiveTab, addToQueryHistory }) => {
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || { query: "" };
  const [query, setQuery] = useState(activeTabData.query);
  const [theme, setTheme] = useState("light");
  const [toastMessage, setToastMessage] = useState(null);

  // Memoize functions to prevent unnecessary re-renders
  const handleEditorChange = useCallback((value) => {
    setQuery(value);
    updateQuery(value);
  }, [updateQuery]);

  const handleRunQuery = useCallback(() => {
    const result = mockDatabase(query);
    updateResult(result);
    addToQueryHistory(query);
    showToast("Query executed successfully!");
  }, [query, updateResult, addToQueryHistory]);

  const handleFormatQuery = useCallback(() => {
    const formattedQuery = sqlFormatter(query);
    updateQuery(formattedQuery);
    showToast("SQL formatted successfully!");
  }, [query, updateQuery]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(query)
      .then(() => {
        showToast("SQL query copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        showToast("Failed to copy SQL query!", "error");
      });
  }, [query]);

  const showToast = useCallback((message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null); // Hide the toast after 3 seconds
    }, 3000);
  }, []);

  // Update query when active tab or tabs change
  useEffect(() => {
    setQuery(activeTabData.query);
  }, [activeTab, tabs]);

  // Update theme when it changes in the document
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme || "light");
  }, []);

  // Handle keyboard shortcuts (memoize to prevent unnecessary re-renders)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        if (event.key === "Enter") {
          event.preventDefault();
          handleRunQuery();
        }
        if (event.key === "z" || event.key === "Z") {
          event.preventDefault();
          handleFormatQuery();
        }
        if (event.key === "s" || event.key === "S") {
          event.preventDefault();
          handleCopy();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRunQuery, handleFormatQuery, handleCopy]);

  return (
    <div className={`${styles.queryInputContainer} ${styles[theme]}`}>
      <div className={styles.topContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={handleRunQuery} className={styles.runButton}>
            <Play size={16} />
            Run Query
          </button>
          <button onClick={handleFormatQuery} className={styles.formatButton}>
            <Code2 size={16} />
            Format SQL
          </button>
          <button onClick={handleCopy} className={styles.copyButton}>
            <Copy size={16} />
            Copy Code
          </button>
        </div>
        <div className={styles.labelDropdownContainer}>
          <QueryDropDown updateQuery={updateQuery} />
        </div>
      </div>
      <TabManager tabs={tabs} setTabs={setTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <MonacoEditor
        className={styles.monacoEditor}
        height="250px"
        language="sql"
        value={query}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          selectOnLineNumbers: true,
          fontSize: 16,
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "on",
          renderLineHighlight: "all",
          contextmenu: true,
          quickSuggestions: true,
        }}
      />
      
      {/* Toast notification */}
      {toastMessage && (
        <div className={`${styles.toast} ${styles[toastMessage.type]}`}>
          {toastMessage.message}
        </div>
      )}
    </div>
  );
};

export default QueryInput;

import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Play, Code2, Copy } from "lucide-react";
import sqlFormatter from "../../utils/sqlFormatter";
import styles from "./QueryInput.module.css";
import mockDatabase from "../../database/mockdatabase";
import QueryDropDown from "../QueryDropDown/QueryDropDown";
import TabManager from "../TabManager/TabManager";

const QueryInput = ({ activeTab, tabs = [], updateQuery, updateResult, setTabs, setActiveTab, addToQueryHistory }) => {
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || { query: "" };
  const [query, setQuery] = useState(activeTabData.query);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setQuery(activeTabData.query);
  }, [activeTab, tabs]);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme || "light");
  }, []);

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
  }, [query]);

  const handleEditorChange = (value) => {
    setQuery(value);
    updateQuery(value);
  };

  const handleRunQuery = () => {
    const result = mockDatabase(query);
    updateResult(result);
    addToQueryHistory(query);
  };

  const handleFormatQuery = () => {
    const formattedQuery = sqlFormatter(query);
    updateQuery(formattedQuery);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(query)
      .then(() => {
        alert("SQL query copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

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
    </div>
  );
};

export default QueryInput;

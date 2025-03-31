import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import QueryInput from "./components/QueryInput/QueryInput";
import QueryResult from "./components/QueryResult/QueryResult";
import Notepad from "./components/Notepad/Notepad";
import NotificationBar from "./components/NotificationBar/NotificationBar";
import "./App.css";

const App = () => {
  const [tabs, setTabs] = useState([
    { id: 1, name: "Query 1", query: "", result: [] },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [queryHistory, setQueryHistory] = useState([]);

  const updateQuery = (query) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab ? { ...tab, query } : tab
      )
    );
  };

  const updateResult = (result) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTab ? { ...tab, result } : tab
      )
    );
  };

  const handleExecuteQuery = (newQuery) => {
    const timeExecuted = new Date().toLocaleString();
    const newHistoryItem = { query: newQuery, time: timeExecuted };
    setQueryHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
  };

  return (
    <div className="app-container">
      <Navbar
        queryHistory={queryHistory}
        handleExecuteQuery={handleExecuteQuery}
      />
      <NotificationBar />
      <div className="container">
        <QueryInput
          activeTab={activeTab}
          tabs={tabs}
          updateQuery={updateQuery}
          updateResult={updateResult}
          setTabs={setTabs}
          setActiveTab={setActiveTab}
          addToQueryHistory={handleExecuteQuery}
        />
        <Notepad />
      </div>
      <QueryResult activeTab={activeTab} tabs={tabs} />
    </div>
  );
};

export default App;

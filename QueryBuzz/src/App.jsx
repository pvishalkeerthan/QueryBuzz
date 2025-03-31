import React, { useState, Suspense, lazy } from "react";
import "./App.css";

const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const QueryInput = lazy(() => import("./components/QueryInput/QueryInput"));
const QueryResult = lazy(() => import("./components/QueryResult/QueryResult"));
const Notepad = lazy(() => import("./components/Notepad/Notepad"));
const NotificationBar = lazy(() => import("./components/NotificationBar/NotificationBar"));

const App = () => {
  const [tabs, setTabs] = useState([
    { id: 1, name: "Query 1", query: "", result: [] },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [queryHistory, setQueryHistory] = useState([]); // Ensure this is defined

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default App;

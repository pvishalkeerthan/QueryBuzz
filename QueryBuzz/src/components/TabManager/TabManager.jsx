import { useState } from "react";
import styles from "./TabManager.module.css";

const TabManager = ({ activeTab, setActiveTab, tabs, setTabs }) => {
  const addTab = () => {
    const newTab = {
      id: Date.now(),
      name: `Query ${tabs.length + 1}`,
      query: "",
      result: [],
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const removeTab = (id) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (activeTab === id) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
  };

  return (
    <div className={styles.tabManager}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
            {tabs.length > 1 && (
              <button
                className={styles.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button className={styles.addTab} onClick={addTab}>➕</button>
      </div>
    </div>
  );
};

export default TabManager;

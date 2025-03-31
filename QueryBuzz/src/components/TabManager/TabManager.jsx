import { useCallback } from "react";
import styles from "./TabManager.module.css";

const TabManager = ({ activeTab, setActiveTab, tabs, setTabs }) => {
  const addTab = useCallback(() => {
    const newTab = {
      id: Date.now(),
      name: `Query ${tabs.length + 1}`,
      query: "",
      result: [],
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTab(newTab.id);
  }, [tabs, setActiveTab, setTabs]);

  const removeTab = useCallback((id) => {
    if (tabs.length === 1) return;
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    if (activeTab === id) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0].id : null);
    }
  }, [activeTab, setActiveTab, setTabs, tabs]);

  return (
    <div className={styles.tabManager}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`tab-${tab.id}`}
          >
            {tab.name}
            {tabs.length > 1 && (
              <button
                className={styles.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                aria-label={`Close tab ${tab.name}`}
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button className={styles.addTab} onClick={addTab} aria-label="Add new tab">
          ➕
        </button>
      </div>
    </div>
  );
};

export default TabManager;

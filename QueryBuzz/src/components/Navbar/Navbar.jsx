import React, { useState, useCallback } from 'react';
import { Database, PenSquare, History, X } from 'lucide-react';
import styles from './Navbar.module.css';
import QueryHistory from '../QueryHistory/QueryHistory';

const Navbar = React.memo(({ queryHistory, handleExecuteQuery }) => {
  const [activeButton, setActiveButton] = useState("editor");
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

  const handleButtonClick = useCallback((section) => {
    if (section === "history") {
      setShowHistoryPopup(true);
    } else {
      setShowHistoryPopup(false);
    }
    setActiveButton(section);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowHistoryPopup(false);
    setActiveButton("editor");
  }, []);

  return (
    <header className={styles.appHeader}>
      <div className={styles.logoContainer}>
        <Database className={styles.logoIcon} size={32} />
        <h1>QueryBuzz</h1>
      </div>
      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${
            activeButton === "editor" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("editor")}
        >
          <PenSquare className={styles.icon} />
          SQL Editor
        </button>
        <button
          className={`${styles.navButton} ${
            activeButton === "history" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("history")}
        >
          <History className={styles.icon} />
          History
        </button>
      </div>

      {showHistoryPopup && (
        <div className={styles.modalOverlay} onClick={handleClosePopup}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleClosePopup}>
              <X />
            </button>
            <QueryHistory queryHistory={queryHistory} />
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import QueryHistory from "../QueryHistory/QueryHistory";

const Navbar = ({ queryHistory, handleExecuteQuery }) => {
  const [activeButton, setActiveButton] = useState("editor");
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

  const handleButtonClick = (section) => {
    if (section === "history") {
      setShowHistoryPopup(true);
    } else {
      setShowHistoryPopup(false);
    }
    setActiveButton(section);
  };

  const handleClosePopup = () => {
    setShowHistoryPopup(false);
    setActiveButton("editor");
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>📄</span>
        <h1>QueryBuzz</h1>
      </div>
      <div className={styles.navButtons}>
        <button
          className={`${styles.navButton} ${
            activeButton === "editor" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("editor")}
        >
          <span className={styles.icon}>📝</span>
          SQL Editor
        </button>
        <button
          className={`${styles.navButton} ${
            activeButton === "history" ? styles.active : ""
          }`}
          onClick={() => handleButtonClick("history")}
        >
          <span className={styles.icon}>⏱️</span>
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
              X
            </button>
            <QueryHistory queryHistory={queryHistory} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { X, Bell, Keyboard, Info } from 'lucide-react';
import styles from './NotificationBar.module.css';

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem('notification-bar-seen');
    if (!hasSeenNotification) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('notification-bar-seen', 'true');
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.notificationBar}>
            <div className={styles.header}>
              <Bell className={styles.bellIcon} size={20} />
              <span className={styles.welcomeText}>Welcome to QueryBuzz !</span>
              <button className={styles.closeButton} onClick={handleClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'features' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <Info size={16} />
                Features
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'shortcuts' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('shortcuts')}
              >
                <Keyboard size={16} />
                Shortcuts
              </button>
            </div>

            <div className={styles.content}>
              {activeTab === 'features' && (
                <div className={styles.features}>
                  <h3>Powerful Features at Your Fingertips</h3>
                  <ul>
                    <li>
                      <div className={styles.featureIcon}>📝</div>
                      <div className={styles.featureContent}>
                        <strong>Monaco Editor</strong>
                        <span>Professional code editing with syntax highlighting and auto-completion</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.featureIcon}>📑</div>
                      <div className={styles.featureContent}>
                        <strong>Multiple Tabs</strong>
                        <span>Work on several queries simultaneously with organized tabs</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.featureIcon}>⏱️</div>
                      <div className={styles.featureContent}>
                        <strong>Query History</strong>
                        <span>Track and restore your previous queries instantly</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.featureIcon}>📌</div>
                      <div className={styles.featureContent}>
                        <strong>Smart Notes</strong>
                        <span>Save and organize important SQL snippets and reminders</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.featureIcon}>🔍</div>
                      <div className={styles.featureContent}>
                        <strong>Download Results</strong>
                        <span>Download your query results in CSV or JSON formats</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === 'shortcuts' && (
                <div className={styles.shortcuts}>
                  <h3>Keyboard Shortcuts</h3>
                  <div className={styles.shortcutGrid}>
                    <div className={styles.shortcut}>
                      <span>Run Query</span>
                      <kbd>Ctrl + Enter</kbd>
                    </div>
                    <div className={styles.shortcut}>
                      <span>Format Query</span>
                      <kbd>Ctrl + Z</kbd>
                    </div>
                    <div className={styles.shortcut}>
                      <span>Copy Query</span>
                      <kbd>Ctrl + S</kbd>
                    </div>
                    <div className={styles.shortcut}>
                      <span>Download CSV</span>
                      <kbd>Ctrl + D</kbd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBar;

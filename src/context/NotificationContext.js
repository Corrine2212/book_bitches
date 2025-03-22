'use client';
import { createContext, useState, useEffect, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  const updateNotifications = () => {
    const corrineNotifs = JSON.parse(localStorage.getItem('notifs-corrine-main') || '[]');
    const bethNotifs = JSON.parse(localStorage.getItem('notifs-beth-main') || '[]');
    const viewedCorrine = localStorage.getItem('notifViewed-corrine-main') === 'true';
    const viewedBeth = localStorage.getItem('notifViewed-beth-main') === 'true';

    const unreadCount = (viewedCorrine ? 0 : corrineNotifs.length) + 
                        (viewedBeth ? 0 : bethNotifs.length);
    setCount(unreadCount);

    const all = [...corrineNotifs, ...bethNotifs]
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, 5);

    setNotifications(all);
  };

  useEffect(() => {
    updateNotifications();

    const interval = setInterval(updateNotifications, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const toggleNotifications = () => {
    const newState = !showNotifications;
    setShowNotifications(newState);
    if (newState) {
      localStorage.setItem('notifViewed-corrine-main', 'true');
      localStorage.setItem('notifViewed-beth-main', 'true');
      setCount(0);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotifications,
        toggleNotifications,
        notifications,
        count,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("notifications");

    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  // SAVE

  useEffect(() => {
    localStorage.setItem(
      "notifications",

      JSON.stringify(notifications),
    );
  }, [notifications]);

  // ADD

  const addNotification = ({ title, message, type = "general" }) => {
    // LOAD SETTINGS

    const savedSettings = localStorage.getItem("notification_settings");

    const settings = savedSettings
      ? JSON.parse(savedSettings)
      : {
          transactions: true,

          exports: true,

          email: false,

          push: true,
        };

    // BLOCK IF DISABLED

    if (type === "transaction" && !settings.transactions) {
      return;
    }

    if (type === "export" && !settings.exports) {
      return;
    }

    const newNotification = {
      id: Date.now(),

      title,

      message,

      type,

      read: false,

      time: new Date().toLocaleString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // MARK READ

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              read: true,
            }
          : item,
      ),
    );
  };

  // CLEAR

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,

        addNotification,

        markAsRead,

        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    let timer;
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeNotification]);
  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };
  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

import React, { createContext, useState } from 'react';
import AddAlert from '@material-ui/icons/NotificationsActive';
import Snackbar from 'components/Snackbar/Snackbar';

export const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const onClose = () => setNotifications(notifications);
    const notificationContent = { ...notification, onClose };

    setNotifications([...notifications, notificationContent]);

    window.setTimeout(() => onClose(), 2000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      <>
        {notifications.map((notification, index) => (
          <Snackbar
            place={notification.place || 'tr'}
            color={notification.color || 'info'}
            icon={AddAlert}
            message={notification.message}
            open={true}
            key={'Notification' - index}
            close
            closeNotification={() => notification.onClose()}
          />
        ))}
        {children}
      </>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

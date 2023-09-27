import { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import MainHeader from './main-header';
import Notification from '../ui/notification';
function Layout(props) {
  const notificationCTX = useContext(NotificationContext);
  const activeNotification = notificationCTX.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;

import { Fragment, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import MainHeader from './main-header';
import Notification from '../ui/notification';
function Layout(props) {
  const notificationCTX = useContext(NotificationContext);
  const activeNotification = notificationCTX.notification;
  console.log('activeNoti', activeNotification);
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

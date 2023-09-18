import classes from './newsletter-registration.module.css';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import { useRef } from 'react';
function NewsletterRegistration() {
  const notificationCTX = useContext(NotificationContext);
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    //show pending notification
    notificationCTX.showNotification({
      title: 'Pending ...',
      message: 'The email has been sent. Awaiting response.',
      status: 'pending',
    });
    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        console.log(response);
        throw new Error('Something went wrong.');
      })
      .then((data) => {
        //show success notification
        notificationCTX.showNotification({
          title: 'Success!!',
          message: 'Successfully registered for newsletter',
          status: 'success',
        });
      })
      .catch((error) => {
        //show error notification
        notificationCTX.showNotification({
          title: 'Error!!',
          message: error.message || 'Something went wron',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

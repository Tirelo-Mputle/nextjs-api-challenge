import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const notificationCTX = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
    console.log(comments);
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    //show pending message
    notificationCTX.showNotification({
      title: 'Adding comment. Awaiting response.',
      message: 'Adding comment to db',
      status: 'pending',
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((data) =>
        notificationCTX.showNotification({
          title: 'Success',
          message: 'Successfully added comment to database.',
          status: 'success',
        })
      )
      .catch((error) => {
        notificationCTX.showNotification({
          title: 'Error',
          message:
            error.message ||
            'There has been an error adding your comment to the database.',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading ...</p>}
    </section>
  );
}

export default Comments;

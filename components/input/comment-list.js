import classes from './comment-list.module.css';

function CommentList(props) {
  const { items } = props;
  console.log(items);
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}

      {items.map((item) => {
        console.log(item);
        return (
          <li key={item._id}>
            <p>{item.comment.text}</p>
            <div>
              By <address>{item.comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;

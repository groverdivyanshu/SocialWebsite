
import styles from "../Styles/home.module.css" ;
import React from 'react'
import PropTypes from "prop-types";

export default function Comment({comment}) {
  return (
    <>
    <div className={styles.postCommentsItem}>
<div className={styles.postCommentHeader}>
  <span className={styles.postCommentAuthor}>{comment.user.name}</span>
  <span className={styles.postCommentTime}>a minute ago</span>
  <span className={styles.postCommentLikes}>22</span>
</div>

<div className={styles.postCommentContent}>{comment.content}</div>
</div>
</>
  )
};

Comment.prototypes={
    comment:PropTypes.object.isRequired,
};



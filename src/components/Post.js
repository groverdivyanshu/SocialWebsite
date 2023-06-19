import React, { useState } from 'react'
import styles from "../Styles/home.module.css";
import{Link } from "react-router-dom";
import Comment from './Comment';
import { createComment, toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';



export default function Post({post}) {

const [comment,setComment]=useState('');
const[creatingComment,setCreatingComment]=useState(false);
const posts=usePosts();
const {addToast}=useToasts();

const handleAddComment=async (e)=>{
    if(e.key==='Enter')
    {
        setCreatingComment(true);
        const response=await createComment(comment,post._id);
        if(response.success)
        {
            setComment('');
            posts.addComment(response.data.comment,post._id);
            addToast('Comment creates successfully',{
                appearance:'success',
            });

        }else
        {
            addToast(response.message,{
                appearance:'error',
            });
        }

    }

}
const handlePostLikeClick=async()=>{
    const response=await toggleLike(post._id,'Post');
    if(response.success)
    {
      if(response.data.deleted)
      {
      addToast("Like remove sucessfully",{
        appearance:'success'
      })
    }
    else{
      addToast('Like added sucessfullr',{
        appearance:'success',
      });

    }
    }
    else
    {
      addToast(response.message,{
        appearance:'error',
      })
    }
    
}
  return (
    <div className={styles.postWrapper} key={post._id}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/6819/6819650.png"
                alt="user-pic"
              />
              <div>
                <Link to ={`/user/${post.user._id}`}className={styles.postAuthor}>{post.user.name}</Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <button onClick={handlePostLikeClick}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                  alt="likes-icon"
                />
                </button>   
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3193/3193015.png"
                  alt="comments-icon"
                />
               
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" 
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              onKeyDown={handleAddComment}/>
            </div>

            <div className={styles.postCommentsList}>
             {post.comments.map((comment)=>(
              <Comment comment={comment} key={`post-comment-${comment._id}`}/>

             ))}
            </div>
          </div>
        </div>
  )
}

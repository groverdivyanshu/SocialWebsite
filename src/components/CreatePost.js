import React from 'react'
import styles from "../Styles/home.module.css";
import { useState } from 'react';
import { addPost } from '../api';
import { useToast } from 'react-toastify';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

export default function CreatePost() {
    const [post,setPost]=useState('');
    const [addingPost,setAddingPost]=useState(false);
const{addToast  }=useToasts();
const posts=usePosts();


    const handleAddPostClick=async ()=>{

      setAddingPost(true);

      const response=await addPost(post);
      if(response.success)
      {
        setPost('');
        posts.addPostToState(response.data.post);
        addToast("Post created suucesfuuly",{
          appearance:'success'

        })
      }
      else{
        addToast(response.message,{
appearance:"error",
        })
      }
      setAddingPost(false);

    };
  return (
    <div className={styles.createPost}>

          <textarea className={styles.addPost} value={post}onChange={(e)=>setPost(e.target.value)} />

      <div>
        <button className={styles.addPostBtn}
        onClick={handleAddPostClick}
        disabled={addingPost}>
           {addingPost?'Adding post...':'Add Post'}
            </button>
    </div>
    </div>
  )
}

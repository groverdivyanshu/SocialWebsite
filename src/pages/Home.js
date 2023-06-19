
import styles from "../Styles/home.module.css" ;
import React from 'react'
import PropTypes from "prop-types";
import Comment from "../components/Comment";
import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Loader } from "../components";
import { Link } from "react-router-dom";
import { useAuth, usePosts } from "../hooks";
import FriendList from "./FriendList";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";


const Home = () => {

const auth=useAuth();
const posts=usePosts();

if(posts.loading)
{
  return <Loader/>;
}
 
  return (
   
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost/>
      {posts.data.map((post)=>(
        <Post post={post} key={`post-${post._id}`}/>

     ) )}
        
      
    </div>
    {auth.user && <FriendList/>}
    </div>
  );
};


export default Home;

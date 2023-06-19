import React from 'react'
import styles from "../Styles/home.module.css"
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom';

export default function FriendList() {
    const auth=useAuth();
    const {friends=[]}=auth.user;
    
    return (
    <div className={styles.friendsList}>
        <div className={styles.header}>Friends</div>

{friends && friends.length=== 0 &&
(<div className={styles.noFriends}>No freinds found!</div>

)}
{friends && friends.map((friend)=>(
<div key={`friend-${friend._id}`}>


<Link className={styles.friendsItem} to={`/user/${friend._id}`}>
    <div className={styles.friendsItem}>
        <img src="" alt=""/>
        </div> 
<div className={styles.friendsName}>{friend.to_user.email}</div>
</Link>
</div>
))}
</div>
  )
}

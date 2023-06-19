import React, { useEffect, useState } from 'react'
import styles from "../Styles/setting.module.css"
import { useAuth } from '../hooks'
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addFrien, fetchUserProfile, rmeoveFriend } from '../api';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components';



const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  
  const auth = useAuth();
  
  const navigate=useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
        
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return navigate('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, navigate, addToast]);

if(loading)
{
  return <Loader/>
}

const checkIfUserIsAFriend=()=>{
  const friends=auth.user?.friends;
  const friendIds=friends?.map(friend=>friend.to_user._id);
  
const index=friendIds.indexOf(userId);

if(index===-1)
{
  return false;

}
else
{
  return true;
}

  
}

const handleRemoveFriendclick=async ()=>{
  setRequestInProgress(true);
 
  const response=await rmeoveFriend(userId);
  

  if(response.success)
  {
    const friendship=auth.user.friends.filter(friend=>friend.to_user._id===userId)
  
    auth.updateUserFriends(false,friendship[0]);
    addToast('friend removed sucesfuult',{
      appearance:'success',
    })
    
  }else{
    console.log("I am freind you");
    addToast(response.message,{
      appearance:'error'
    })

  }
  setRequestInProgress(false)

}
const handleaddFreind=async ()=>{
  
  setRequestInProgress(true);
 
  const response=await addFrien(userId);
  

  if(response.success)
  {
    console.log("I am sucess");
    const {friendship}=response.data;
    auth.updateUserFriends(true,friendship);
    addToast('friend added sucesfuult',{
      appearance:'success',
    })
    
  }else{
    console.log("I am freind you");
    addToast(response.message,{
      appearance:'error'
    })

  }
  setRequestInProgress(false)
}

  return (
    <div className={styles.settings}>
    <div className={styles.imgContainer}>
        <img src="https://cdn-icons-png.flaticon.com/128/4440/4440953.png" alt=""/>

    </div>
     <div className={styles.field}>
    <div className={styles.fieldName}>Email</div>
    
    <div className={styles.fieldLabel}>{user?.email}</div>
    
    </div>
    <div className={styles.field}>
    <div className={styles.fieldName}>Name</div>
    <div className={styles.fieldLabel}>{user?.name}</div>
    </div>
    
    <div className={styles.btnGrp}>
      {checkIfUserIsAFriend()?
       <button className={`button ${styles.editBtn}`} onClick={handleRemoveFriendclick}>{requestInProgress?'Remmove freind...':'Remove friend'}</button>

:
<button className={`button ${styles.saveBtn}`} onClick={handleaddFreind} 
 disabled={requestInProgress}
>{requestInProgress?'Adding friend...':'Add friend'}
</button>

      }
     </div>
    </div>
    
  )
}
export default UserProfile;
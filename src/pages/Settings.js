import React from 'react'
import styles from "../Styles/setting.module.css";
import { useAuth } from '../hooks';
import { useState } from 'react';

import { useToasts } from 'react-toast-notifications';
function Settings() {

const auth=useAuth();
const[editMode,setEditMode]=useState(false);
const[name,setName]=useState(auth.user?.name ? auth.user.name : '');
const[password,setPassword]=useState(false);
const[confirmpassword,setConfirmPassword]=useState(false);
const[savingForm,setSavingForm]=useState(false);
const {addToast}=useToasts();

const clearForm=()=>{
  setPassword('');
  setConfirmPassword('');
}
const updateProfile = async () => {
  setSavingForm(true);

  let error = false;
  if (!name || !password || !confirmpassword) {
    addToast('Please fill all the fields', {
      appearance: 'error',
    });

    error = true;
  }

  if (password !== confirmpassword) {
    addToast('Password and confirm password does not match', {
      appearance: 'error',
    });

    error = true;
  }

  if (error) {
    return setSavingForm(false);
  }

  const response = await auth.updateUser(
    auth.user._id,
    name,
    password,
    confirmpassword
  );

  console.log('settings response', response);
  if (response.success) {
    setEditMode(false);
    setSavingForm(false);
    clearForm();

    return addToast('User updated successfully', {
      appearance: 'success',
    });
  } else {
    addToast(response.message, {
      appearance: 'error',
    });
  }
  setSavingForm(false);
};
  return (
    <div className={styles.settings}>
<div className={styles.imgContainer}>
    <img src="https://cdn-icons-png.flaticon.com/128/4440/4440953.png" alt=""/>
</div>
<div className={styles.field}>
<div className={styles.fieldName}>Email</div>

<div className={styles.fieldLabel}>{auth.user?.email}</div>

</div>
<div className={styles.field}>
<div className={styles.fieldName}>Name</div>

{
    editMode?
    (<input type="text"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />):

(<div className={styles.fieldLabel}>{auth.user?.name}</div>
)}

</div>
{editMode && <><div className={styles.field}>
              <div className={styles.fieldName}>Password</div>
              <input type='password' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>

          </div><div className={styles.field}>
                  <div className={styles.fieldName}>Confirm Password</div>
                  <input type='password' 
                  value={confirmpassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                  
                  />
                  </div>
                  </>
 }


              <div className={styles.btnGrp}>
                 {editMode ?(
                 <>
                 <button className={`button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm}>

                    {savingForm?'Saving profile...':'Save Profile'}

                    </button>
                    <button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(false)}>
                    Go back

                    </button>
                    </>
                 )
            :
                 (<button className={`button ${styles.editBtn}`} onClick={()=>setEditMode(true)}>Edit Profile </button>)}
              </div>
    </div>
  )
}

export default Settings
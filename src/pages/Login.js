import React, { useState } from 'react'
import styles from "../Styles/login.module.css";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login } from "../api";
import { useAuth } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';



export  function Login() {
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[loggingIn,setLogingIn]=useState(false);
const { addToast } = useToasts();


const auth=useAuth();
const navigate=useNavigate();

const handleSubmit= async(e)=>{

  e.preventDefault();

  setLogingIn(true);
  const response=await auth.login(email, password);
  console.log("login",response)
  console.log("*",response);

if(!email||!password)
  {
    return addToast('Please enter both email and password', {
      appearance: 'error',
    });

}
  
if(response.success){
  

  addToast('Successfully logged in', {
    appearance: 'success',
  });
}


  else{
    console.log("response");
    addToast(response.message, {
      appearance: 'error',
    });
  }
  setLogingIn(false);

};
if(auth.user)
{
  navigate("/");
  
}

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>

    <span className={styles.loginSignupHeader}>Log In</span>
<div className={styles.field}>
    <input type='email' placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>


</div>
  <div className={styles.field}>
    <input type='password' placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>


</div>
<div className={styles.field}  >
    <button disabled={loggingIn}>{loggingIn ?'loging in':'Log In'}</button>
  


</div>
    
    </form>

  );
};

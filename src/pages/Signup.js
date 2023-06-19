import React, { useState } from 'react';
import styles from '../Styles/login.module.css';
import { toast,ToastContainer } from 'react-toastify';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';


export default function Signup() {

const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[confirmpassword,setconfirmPassword]=useState('');
const[signingup,setSigningup]=useState('');
const auth=useAuth();
const navigate=useNavigate();
const { addToast } = useToasts();

async function handleFormSubmit(e){
  e.preventDefault();
  setSigningup(true);


  console.log(password,confirmpassword);
  let error=false;
  if(!name || !password || !confirmpassword ||!email)
  {
    addToast('Please fill all the fields', {
      appearance: 'error',
      autoDismiss: true,
    });
      error=true;

  }
  if(password !== confirmpassword)
  {
   
    addToast('Make sure password and confirm password matches', {
      appearance: 'error',
      autoDismiss: true,
    });
      error=true;
  }

if(error)
{
    
   return setSigningup(false);
}
const  response=await auth.signup(name,email,password,confirmpassword);
console.log(response);
if(response.success)
{
  
   navigate('/login');  
  setSigningup(false);
   
  
  return addToast('User registered successfully, please login now', {
    appearance: 'success',
    autoDismiss: true,
  });
      
      
      
    
}else{
    
    addToast(response.message, {
      appearance: 'error',
      autoDismiss: true,
    });
      
      setSigningup(false);
}


}

if(auth.user){
  console.log("heloooooooooo");
    return navigate("/");
}




  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
    <span className={styles.loginSignupHeader}> Signup</span>
    <div className={styles.field}>
      <input
        placeholder="Name"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="new-password"
      />
    </div>
    <div className={styles.field}>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="new-password"
      />
    </div>
    <div className={styles.field}>
      <input
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className={styles.field}>
      <input
        placeholder="Confirm password"
        type="password"
        required
        value={confirmpassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
    </div>

    <div className={styles.field}>
      <button disabled={signingup}>
        {signingup ? 'Signing up...' : 'Signup'}
      </button>
      <ToastContainer />
    </div>
  </form>
);
};
   
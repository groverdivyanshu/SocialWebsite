import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import {App} from './components/index';
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider ,PostProvider} from './providers';
import { ToastProvider } from 'react-toast-notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AuthProvider>
        <PostProvider>
    <App />
    </PostProvider>
    </AuthProvider>
    </ToastProvider>

    
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


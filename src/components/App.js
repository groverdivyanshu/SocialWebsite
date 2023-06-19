import { useEffect, useState } from "react";
import { getPosts } from "../api";
import Home from "../pages/Home";
import{BrowserRouter  as Router, Route,Routes,Navigate, useNavigate} from "react-router-dom";
import {Login, Settings} from "../pages";
import { UserProfile } from "../pages";
import {Loader,Navbar} from "./";
import { useAuth } from "../hooks";
import  Signup  from "../pages/Signup";
 

function PrivateRoute({children})
{
  const auth =useAuth();
 


  if(auth.user)
  {
    return children;
  }
  return <Navigate to="/login"/>



}

const Page04=()=>{
  return <h1>401</h1>
}
function App() {
 const  auth=useAuth();
 console.log("auth",auth);

// if(auth.loading)

// {
//   return <Loader/>;
// }
  
  return (
    <div className="App">
          
          <Router>
          <Navbar/>
            <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/register" element= {<Signup />}/>
    
          <Route path="/login" element= {<Login/>}/>
          <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute> }/>
        
        
          <Route path="/user/:userId" element={<PrivateRoute><UserProfile/></PrivateRoute> }/>

          <Route path="*" element= {<Page04/>}/>


          
          </Routes>
         </Router>
    </div>
  );
}

export default App;

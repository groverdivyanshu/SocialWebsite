import { useState, useContext,useEffect} from "react"
import { AuthContext } from "../providers/AuthProvider";
import {  login as userLogin, register, editProfile, addFriend } from "../api";
import { setItemLocalStorage,LOCALSTOARGE_TOKEN_KEY, removeItemLocalStorage, getItemLocalStorage } from "../utils";
import jwtDecode from "jwt-decode";
import { fetchuserfriends } from "../api/index";
import { PostContext } from "../providers";
import { getPosts } from "../api";

export const useAuth=()=>{
    return useContext(AuthContext);
}


export const useProvideAuth=()=>{
    
  const [user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
useEffect(()=>{

  const getUser= async()=>{
    const userToken=getItemLocalStorage(LOCALSTOARGE_TOKEN_KEY);
    if(userToken)
    {
        const user=jwtDecode(userToken);
        const response=await fetchuserfriends();
        let friends=[];
        if(response.success)
{
  friends=response.data.friends;

}
else{
  friends=[];
}

        setUser({
          
          ...user,
        friends
        });

    }
setLoading(false);

  }
  getUser();  
},[]);
    const login=async(email,password)=>{


        const response=await userLogin(email,password);
        
        
        if(response.success){
      
            setUser(response.data.user);
            setItemLocalStorage(LOCALSTOARGE_TOKEN_KEY, response.data.token ?  response.data.token:null);


            return{
                success:true
            };
    }
    else{
        return{
        success:false,
        message:response.message,
    }
}

    }
    const updateUser = async (userId, name, password, confirmPassword) => {
       
        const response = await editProfile(userId, name, password, confirmPassword);
    
        console.log('response is', response);
        if (response.success) {
          setUser(response.data.user);
          setItemLocalStorage(
            LOCALSTOARGE_TOKEN_KEY,
            response.data.token ? response.data.token : null
          );
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
        
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };
    
    const logout=()=>{
        setUser(null);
        removeItemLocalStorage(LOCALSTOARGE_TOKEN_KEY);
    };

    const updateUserFriends=(addFriend,friend)=>{

      if(addFriend)
      {
        setUser({
          ...user,
          friends:[...user.friends,friend],
        })
        return;
      }
      const newFriends=user.friends.filter(f=>f.to_user._id!== friend.to_user._id);
setUser({
  ...user,
  friends:newFriends
})

    }

    return {
        user,login,logout,loading,signup,updateUser,updateUserFriends
    }


}

export const usePosts=()=>{
  return useContext(PostContext);
}

export const useProvidePosts=()=>{

  const[posts,setPosts]=useState([]);
const[loading,setLoading]=useState(true);


  useEffect(()=>{

    const fetchposts= async () => {
      const response=await getPosts();
    
      if(response.success)
      {
      setPosts(response.data.posts)
     
      }

      setLoading(false);    }
fetchposts();
    },[]);

const addPostToState=(post)=>{

  const newPosts=[post,...posts];
  
  
  setPosts(newPosts);
};

const addComment=(comment,postId)=>
{
  const newPosts=posts.map((post)=>{
    if(post._id===postId)
    {
      return {...post,comments:[...post.comments,comment]}
    }
    return post;

     });
     setPosts(newPosts);
}
  return{
    data:posts,
    loading,
    addPostToState,
    addComment,
  }

}
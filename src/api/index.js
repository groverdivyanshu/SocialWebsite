


import { API_URLS, LOCALSTOARGE_TOKEN_KEY ,getFormBody} from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTOARGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
   
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};
  export const login=(email,password)=>{
    return customFetch(API_URLS.login(),{
      method:'Post',
      body:{
email:email,
password:password
      }
    });

  };

  export const register=async (name,email,password,confirmpassword)=>{
return customFetch(API_URLS.signup(),{
  method:'POST',
  body:{name,email,password, confirm_password: confirmpassword}
})

  }

  export const editProfile = async (userId, name, password, confirmpassword) => {
   
    return customFetch(API_URLS.editUser(), {
      method: 'POST',
      body: { id: userId, name, password, confirm_password: confirmpassword },
    });
  };
  export const fetchUserProfile=(userId)=>{
    return customFetch(API_URLS.userInfo(userId),{
      method:'GET',
    

  });
};
export const fetchuserfriends=()=>{
  return customFetch(API_URLS.friends(),{
    method:'GET',
  });
};

export const addFrien = async(userID)=>{
 
  const a= customFetch(API_URLS.createFriendship(userID),{
    method:'POST',
  });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",await a);
  return a;
};

export const rmeoveFriend=(userId)=>{
  return customFetch(API_URLS.removeFriend(userId),{
    method:'POST',
  })
}

export const addPost=(content)=>{
  return customFetch(API_URLS.createPost(),{
    method:'POST',
    body:{
      content,
    }
  })
}

export const createComment=async (content,postId)=>{

  return customFetch(API_URLS.comment(),{
    method:'POST',
    body:{
post_id:postId,
content
    }
  })
}
export const toggleLike=(itemId,itemType)=>{
  return customFetch(API_URLS.toggleLike(itemId,itemType),{
    method:'Post',
  })
}
export const searchUser=(searchText)=>{
  return customFetch(API_URLS.searchUsers(searchText),{
    method:'GET'
  })

}
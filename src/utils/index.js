export * from "./constant";
export const getItemLocalStorage=(key)=>{
  if(!key)
  {
    return console.error('can not get value from  Ls');
  }
 return localStorage.getItem(key);
}

export const removeItemLocalStorage=(key)=>{
  
    if(!key)
    {
    return console.error('can not get value from  Ls');
  }
 localStorage.removeItem(key);
 
}

export const setItemLocalStorage=(key,value)=>{
  if(!key||!value)
  {
    return console.error('can not store in Ls');
  }
 const valueToStore=typeof value !== 'string'?JSON.stringify(value):value;

 localStorage.setItem(key,valueToStore);
}
export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };
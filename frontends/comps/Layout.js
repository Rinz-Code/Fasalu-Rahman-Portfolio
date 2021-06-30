import { refreshToken,logoutUser,BASE_URL } from '../api/auth';
import { UserContext } from '../contexts/userContext';
import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { useRouter } from 'next/router';



const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const isUserLoggedIn = !!user;
  const ACCESS_TOKEN = 'access_token'
  // const is_staff = user.is_staff ?? false;
  // console.log(is_staff)
  const REFRESH_TOKEN = 'refresh_token'
  useEffect(() => {
    if (process.browser && window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(REFRESH_TOKEN)){

        const getUserData = async (id)=>{
            const res = await fetch(`${BASE_URL}/users/${id}`);
            const userData = await res.json();
            setUser(userData);
            console.log(userData);
        }

        var refreshedtoken = jwt_decode(window.localStorage.getItem(REFRESH_TOKEN))
        console.log(refreshedtoken)
        getUserData(refreshedtoken.user_id);

    }
},[])

  //  if (process.browser){
  //   const is_staff = user?.is_staff ?? false;
  //   console.log(is_staff);
  //   const router = useRouter();
  //   if (router.pathname.startsWith('/admin')){
  //     if(is_staff !== true){
  //       console.log('Started');
  //       router.push('/');
  //     }
  //   }
  // }

  if (process.browser && window.localStorage.getItem(ACCESS_TOKEN) && window.localStorage.getItem(REFRESH_TOKEN)){
    var accesstoken = window.localStorage.getItem(ACCESS_TOKEN);
    var refreshtoken = window.localStorage.getItem(REFRESH_TOKEN);
    if (jwt_decode(accesstoken).exp < Date.now() / 1000) {
      console.log('refreshed Expired Access')
      refreshToken();
    }
    if (jwt_decode(refreshtoken).exp < Date.now() / 1000) {
      console.log('logouted')
      logoutUser();
      setUser(null);
    }
  }
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    setUser(null);
  }
  const authRequest = process.browser ? axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
        //'Content-Type': 'application/json',
      }
  }) : {BASE_URL: BASE_URL,timeout: 50};

  return (
      <div className="content">
          <UserContext.Provider value={{authRequest,BASE_URL,user, setUser, isUserLoggedIn,logout}}>
              { children }
          </UserContext.Provider>
      </div>
  );
}

export default Layout;

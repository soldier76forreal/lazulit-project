import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Redirect , useHistory } from 'react-router-dom';
axios.defaults.withCredentials = true

const AuthContext = React.createContext({
    
    token:'',
    isLoggedIn : false,
    login:(token)=>{},
    logout:()=>{},
    jwtInst : null,
    defaultTargetApi:''
})


export const AuthContextProvider = (props) =>{
    const savedToken = Cookies.get('accessToken');

    const [token , setToken] = useState(savedToken);
    const userIsLoggedIn = !!token;
    const history = useHistory();

    const logOutHandler = () =>{
        setToken(null)
        Cookies.remove('accessToken');
        deleteRefreshToken()
        history.push('/logIn');

    }
    const logInHandler = async(token) =>{
        Cookies.set('accessToken' , token ,{sameSite: 'strict', secure: true});
        setToken(token);
    }
    const jwt = axios.create(
        ({
            baseURL:'https://api.lazulitemarble.com',
            withCredentials:true,
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
    );
    const contextValue = {
        token :token,
        isLoggedIn: userIsLoggedIn,
        login:logInHandler,
        logout:logOutHandler,
        jwtInst:jwt,
        defaultTargetApi:'https://api.lazulitemarble.com'
    };

    jwt.interceptors.request.use(async (config)=>{
        let currentDate = new Date();
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < currentDate.getTime()){
            const toke = await postRefreshToken();
            Cookies.set('accessToken' , toke.accessToken ,{sameSite: 'strict', secure: true});
            setToken(toke.accessToken);
            config.headers["Authorization"] = `Bearer ${toke.accessToken}`;
        }
        return config;
    },(error)=>{
        return Promise.reject(error);      
              logOutHandler();

    })
    const postRefreshToken = async() =>{
        try{
            const response = await axios({
                withCredentials:true,
                method:"post",
                url:"https://api.lazulitemarble.com/auth/refreshToken",
            })
            const data =  response.data; 
            return data;
        }catch(error){
            console.log(error);
            logOutHandler();
        }
    }

    const deleteRefreshToken =  async () =>{
        try{
            const response = await axios({
                withCredentials:true,
                method:"post",
                url:"https://api.lazulitemarble.com/auth/deleteRefreshToken",
            })
            const data =  response.data; 

        }catch(error){
            console.log(error);
        }
    }
    
    return(
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )   
}


export default AuthContext;




import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
      const [auth,setAuth]=useState(()=>localStorage.getItem("token")?true:false);
    //   const [t,setT]=useState(()=>localStorage.getItem("token"))

     const fetchUser=async()=>{
              const token=localStorage.getItem("token");
               console.log("tokenContext=",token);
              if(!token) 
                   return 
                try{
              const response=await axios.get("http://localhost:5600/user/profile",{
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Bearer token here
                    'Content-Type': 'application/json' // Optional, if you're sending JSON
                  }
              })
            //    console.log(response.data.result)
            setAuth(true);  
                }catch(error){
                    console.log(error);
                    localStorage.removeItem('token');
                }
     }
      useEffect(()=>{  
            fetchUser()
      },[])

      return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
      )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}
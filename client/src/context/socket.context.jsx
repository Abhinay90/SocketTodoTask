import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socketContext=createContext();


export const SocketProvider=({children})=>{

       const [todoSocket,setSocketTodo]=useState();
       const [allTodos,setAllTodos]=useState();
       const navigate=useNavigate()
       
       useEffect(() => {
          const token=localStorage.getItem("token")
                if(!token){
                    navigate("/login");
                }
           
               let socket =io("http://localhost:5600", {
                   auth: {
                       token: token, // Pass token in the auth field
                   }
                });
               
        socket.on("connect_error", (err) => {
            console.log("Connection Error:", err);
            navigate("/login");
        });
        setSocketTodo(socket);

        socket.on("todos", (data) => {

            const temp=data.map((d)=>{
                let dateObj=new Date(d.createdAt)
                d.createdAt=`${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;  
                dateObj=new Date(d.updatedAt)
                d.updatedAt=`${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()}`;  
                return data;
             })
            setAllTodos(data)
          });
        console.log("data=", socket);
      }, []);

        const createTodo=(data)=>{
            console.log("contextData=",data)
            if(todoSocket.connected)
            todoSocket.emit("createTodo",data);   
    }
    
    
    const editTodo=(data)=>{
            console.log("contextData=",data)
            if(todoSocket.connected)
            todoSocket.emit("editTodo",data);   
              
        }
        const deleteTodo=(id)=>{
            console.log("contextData=",id)
            if(todoSocket.connected)
            todoSocket.emit("deleteTodo",id);   
        }
      
       return (
        <socketContext.Provider value={{allTodos,createTodo,editTodo,deleteTodo}}>
         {children} 
        </socketContext.Provider>
       ) 
}

export const useSocket=()=>{
          return useContext(socketContext)
}
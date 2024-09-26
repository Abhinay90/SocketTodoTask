import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getAllTodos, createTodo, updateTodoById, deleteTodoById } from "../controller/todo.controller.js";
import jwt from "jsonwebtoken"
// import {todoController} from "../controller/todo.controller.js"

export const app = express();
export const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: true, // React frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket middleware to check middileware
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Get token from client

  if (!token) {
      return next(new Error('Authentication error'));
  }

  jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
          return next(new Error('Authentication error'));
      }

      socket.user = decoded; // Save decoded user info for later use
      next();
  });
});


io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("createTodo", async(todo) => {
    const newTodo = await createTodo({...todo,user:socket.user})
     const allTodo=await getAllTodos(); 
     io.emit('todos', allTodo);
    });
      
    socket.on("editTodo",async(data)=>{
      const updatedTodo=await updateTodoById(data);
      const allTodo=await getAllTodos();
      console.log("updated=",updatedTodo); 
    io.emit('todos', allTodo);
   })

    socket.on("deleteTodo",async(id)=>{
      const deleteTodo=await deleteTodoById(id);
      const allTodo=await getAllTodos();
      console.log("updated=",deleteTodo); 
    io.emit('todos', allTodo);
   })
   
  getAllTodos().then(data=>socket.emit("todos",data))
});

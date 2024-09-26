import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { io } from "socket.io-client";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoForm from "./pages/TodoForm";
import { SocketProvider } from "./context/socket.context";
import EditTodoForm from "./pages/EditTodoForm";
import { AuthProvider, useAuth } from "./context/Auth.context";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { Button } from "@material-tailwind/react";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<SocketProvider> <Dashboard></Dashboard></SocketProvider>,
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/create",
      element: <SocketProvider><TodoForm /></SocketProvider>,
    },
    {
      path: "/editTodo/:id",
      element: <SocketProvider><EditTodoForm /></SocketProvider>,
    },
    {
      path: "*",
      element: <h1>hello</h1>,
    },
  ]);

  return (
    <>
      <AuthProvider>
        {/* <SocketProvider> */}
          <RouterProvider router={router} />
        {/* </SocketProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;

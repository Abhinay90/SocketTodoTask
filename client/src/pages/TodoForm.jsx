import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { useSocket } from "../context/socket.context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
   
 function TodoForm() {
    const {createTodo}=useSocket();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [assignedUsers,setAssignedUsers]=useState("");
    const navigate=useNavigate()
    const {auth}=useAuth()

    const handleSumbit=(e)=>{
          e.preventDefault() 
          console.log({title,description,assignedUsers})
          createTodo({title,description,assignedUsers});
          setTitle("")
          setDescription("")
          setAssignedUsers("")
          navigate("/")

    }

    useEffect(()=>{
        if(!auth)  
              navigate("/login");
},[auth])
    return (
        <div className="m-5 p-5 flex align-center justify-center">
       <Card color="transparent"  shadow={false}>
        <Typography variant="h4" color="blue-gray">
          New Todo
        </Typography>   
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e)=>handleSumbit(e)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Title
            </Typography>
            <Input
              size="lg"
              placeholder="Title"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setTitle(e.target.value)}  
              value={title}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Textarea
              size="lg"
              placeholder="Description..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setDescription(e.target.value)}  
              value={description}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Assigned Users
            </Typography>
            <Textarea
              size="lg"
              placeholder="name1,name2,..."
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setAssignedUsers(e.target.value)}  
              value={assignedUsers}
              required
            />
          </div>
                   
          <Button 
          className="mt-6" 
          fullWidth
          type="submit"
          ripple={true}
          >
            Create Todo
          </Button>
        </form>
      </Card>
      </div>
    );
  }

  export default TodoForm
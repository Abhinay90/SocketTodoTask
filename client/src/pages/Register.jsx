import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react";
import { useSocket } from "../context/socket.context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
   
 function Register() {
    // const {createTodo}=useSocket();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [errorE,setErrorE]=useState(null);
    const [errorP,setErrorP]=useState(null);
    const [p,setP]=useState(false);
    const [cp,setCp]=useState(false);
    const navigate=useNavigate()
    const handleSumbit=async(e)=>{
        setErrorP(null)
        setErrorE(null)
        e.preventDefault() 
          console.log({name,email,password,confirmPassword})
              if(password!==confirmPassword){
                   setErrorP({error:"Password and Confirm Password not matched"})
                   return;
              }
              try{
                  const response=await axios.post("http://localhost:5600/user/register",{name,email,password,confirmPassword});
                    console.log(response)   
                  if(response.status===201){
                             navigate("/login");
                     }
                }catch(error){
                   console.log(error);
                   setErrorE(error)
              }
             //   createTodo({title,description,assignedUsers});
          setTitle("")
          setDescription("")
          setAssignedUsers("")
          navigate("/")

    }
    return (
        <div className="m-5 p-5 flex align-center justify-center">
       <Card color="transparent"  shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Register
        </Typography>   
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e)=>handleSumbit(e)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setName(e.target.value)}  
              value={name}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="example@gmail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={e=>setEmail(e.target.value)}  
                value={email}
                required
                />
                {errorE&& <p className="text-red-500">{errorE.response.data.error}</p>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
            </Typography>
            <Input
              size="lg"
              type={p?"password":"text"}
              placeholder="Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setPassword(e.target.value)}  
              value={password}
              onFocus={()=>setP(false)}
              onBlur={()=>setP(true)}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Confirm Password
            </Typography>
            <Input
              size="lg"
              type={cp?"password":"text"}
              placeholder="Confirm Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e=>setConfirmPassword(e.target.value)}  
              value={confirmPassword}
              onFocus={()=>setCp(false)}
              onBlur={()=>setCp(true)}
              required
            />
            {errorP&& <p className="text-red-500">{errorP.error}</p>}
          </div>
                   
          <Button 
          className="mt-6" 
          fullWidth
          type="submit"
          ripple={true}
          >
            Register
          </Button>
        </form>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <button onClick={()=>navigate("/login")} className="font-medium text-gray-900">
            Log In
          </button>
        </Typography>
      </Card>
      </div>
    );
  }

  export default Register
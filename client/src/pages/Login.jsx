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
function Login() {
  // const {createTodo}=useSocket();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [errorE,setErrorE]=useState(null);
  const [errorP,setErrorP]=useState(null);
  const [p,setP]=useState(false);
  const [cp,setCp]=useState(false);
  const navigate=useNavigate()
  const handleSumbit=async(e)=>{
      setErrorP(null)
      setErrorE(null)
      e.preventDefault() 
        console.log({email,password})
            try{
                const response=await axios.post("http://localhost:5600/user/login",{email,password});
                if(response.status===200){
                  console.log(response)   
                        localStorage.setItem("token",response.data.result)
                           navigate("/");
                   }
              }catch(error){
                 console.log(error);
                 setErrorE(error)
            }
           //   createTodo({title,description,assignedUsers});
      //   setTitle("")
      //   setDescription("")
      //   setAssignedUsers("")
      //   navigate("/")

  }
  return (
      <div className="m-5 p-5 flex align-center justify-center">
     <Card color="transparent"  shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>   
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e)=>handleSumbit(e)}>
        <div className="mb-1 flex flex-col gap-6">
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
          {errorP&& <p className="text-red-500">{errorP.error}</p>}
        </div>
                 
        <Button 
        className="mt-6" 
        fullWidth
        type="submit"
        ripple={true}
        >
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
           Have not a  account?{" "}
          <button onClick={()=>navigate("/register")} className="font-medium text-gray-900">
            Register
          </button>
        </Typography>
      </form>
    </Card>
    </div>
  );
}

export default Login
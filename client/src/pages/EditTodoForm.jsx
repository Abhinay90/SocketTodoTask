import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSocket } from "../context/socket.context";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

function EditTodoForm() {
  //   const { todoSocket } = useSocket();
  const [title, setTitle] = useState("");
  const { allTodos, editTodo } = useSocket();
  const [todo, setTodo] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [assignedUsers, setAssignedUsers] = useState("");
  const [status, setStatus] = useState("");
  const {auth}=useAuth()

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log({ title, description, assignedUsers, status });
    editTodo({ id, title, description, assignedUsers, status });
    setTitle("");
    setDescription("");
    setAssignedUsers("");
    setStatus("");
    navigate("/");
  };
  useEffect(() => {
    const todo = allTodos.find((data) => data._id === id);
    console.log("todo=", todo);
    setTitle(todo.title);
    setDescription(todo.description);
    const result = todo.assignedUsers.join(", ");
    console.log(result);
    setAssignedUsers(todo.assignedUsers.join(", "));
    setStatus(todo.status);
  }, [allTodos]);


  useEffect(()=>{
    console.log("/login=",auth)
    if(!auth)   
          navigate("/login");
},[auth])
  return (
    <div className="m-5 p-5 flex align-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Todo
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) => handleSumbit(e)}
        >
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setAssignedUsers(e.target.value)}
              value={assignedUsers}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Status
            </Typography>
            <Select
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setStatus(e)}
              value="Select"
              placeholder="Select"
            >
              <Option>Select</Option>
              <Option value="pending">Pending</Option>
              <Option value="compeleted">Compeleted</Option>
            </Select>
          </div>

          <Button className="mt-6" fullWidth type="submit" ripple={true}>
            Edit Todo
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditTodoForm;

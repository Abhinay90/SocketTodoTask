import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import DialogDefault from "../components/Modal";
import { useSocket } from "../context/socket.context";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";

const TABLE_HEAD = [
  "Title",
  "Discription",
  "Status",
  "Assigned Users",
  "Created At",
  "Updated At",
  "Actions",
];

function Dashboard() {
  const navigate = useNavigate(); 
  const { allTodos,deleteTodo } = useSocket();
  const {auth}=useAuth();
  console.log("=",auth)


  const handleEditButton = (_id) => {
        navigate(`/editTodo/${_id}`)
  };

  const handleDeleteButton = (id) => {
    deleteTodo(id)
  };
   useEffect(()=>{
    // console.log(auth)
            if(!auth)
                  navigate("/login");
   },[])
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Todo list
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={()=>navigate("/create")}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> New Todo
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allTodos?.map(
                (
                  {
                    _id,
                    title,
                    assignedUsers,
                    description,
                    status,
                    createdAt,
                    updatedAt
                  },
                  index
                ) => {
                  const isLast = index === allTodos.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  
                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {title}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          {
                            <DialogDefault
                              title={title}
                              description={description}
                              assignedUsers={assignedUsers}
                            ></DialogDefault>
                          }
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              status === "compeleted" ? "Compeleted" : "Pending"
                            }
                            color={
                              status === "compeleted" ? "green" : "blue-gray"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {assignedUsers.length}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">{updatedAt}</div>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Edit Todo">
                          <IconButton
                            variant="text"
                            onClick={() => handleEditButton(_id)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Todo">
                          <IconButton
                            variant="text"
                            onClick={()=>handleDeleteButton(_id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default Dashboard;

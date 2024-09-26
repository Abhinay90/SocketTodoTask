import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
 function DialogDefault({title,description,assignedUsers}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button variant="outlined" size="sm" onClick={handleOpen}>
        Show Description
      </Button>
      {/* <Button variant="outlined">outlined</Button> */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
        Assigned Users: 
           {assignedUsers.map(user=><span>{user}, </span>)}
        </DialogBody>
        <DialogBody>
           {description}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DialogDefault;
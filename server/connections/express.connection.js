import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "../routes/user.routes.js"
import {app,httpServer} from "../socket/index.js"
config();

app.use(cors());
app.use(express.json())
app.use("/user",userRouter); 

const PORT = process.env.PORT || "5600";
app.get("/", (req, res) => {
  res.send("<h1>Server running</h1>");
});

const startServer = () => {
  try {
    httpServer.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`,);
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default startServer;

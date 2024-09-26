import Todo from "../models/todo.model.js";

export const createTodo = async (data) => {
  try {
    console.log("CreateControllerdata=", data);
    const { title, description, assignedUsers, user } = data;
    console.log(assignedUsers.split(","));
    const newData = await Todo.create({
      user: user.id,
      title,
      description,
      assignedUsers: assignedUsers.split(","),
    });

    console.log(newData);
    return newData;
  } catch (error) {
    console.log("500=", error);
  }
};
export const getAllTodos = async (req, res) => {
  try {
    const newData = await Todo.find();

    console.log("hello=", newData);
    return newData;
  } catch (error) {
    console.log("500=", error);
  }
};
export const getTodoById = (req, res) => {
  try {
    const { user, title, description, status, assignedUsers } = req.body;
  } catch (error) {}
};
export const updateTodoById = async (data) => {
  try {
    const { id, title, description, status, assignedUsers } = data;
    const updateDoc = await Todo.findByIdAndUpdate(
      id,
      { title, description, status, assignedUsers: assignedUsers.split(",") },
      { new: true }
    );
    return updateDoc;
  } catch (error) {
    return console.log("500=", error);
  }
};
export const deleteTodoById = async (id) => {
  try {
    // const {id}=data;
    const deleteDoc = await Todo.findByIdAndDelete(id);
    return deleteDoc;
  } catch (error) {
    return console.log("500=", error);
  }
};

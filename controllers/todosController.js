const {
  getTodos,
  getTodoById,
  addTodo,
  changeTodoById,
  deleteTodoById,
} = require("../services/todos");

const getTodosController = async (req, res) => {
  const { _id: userId } = req.user;

  const todos = await getTodos(userId);

  res.json({ todos });
};

const getTodoByIdController = async (req, res) => {
  const { id: todoId } = req.params;
  const { _id: userId } = req.user;

  const todo = await getTodoById(todoId, userId);

  res.json({ todo, status: "success" });
};

const addTodoController = async (req, res) => {
  const { text } = req.body;
  const { _id: userId } = req.user;

  await addTodo({ text }, userId);

  res.json({ status: "success" });
};

const changeTodoController = async (req, res) => {
  const { text } = req.body;
  const { id: todoId } = req.params;
  const { _id: userId } = req.user;

  await changeTodoById(todoId, { text }, userId);

  res.json({ status: "success" });
};

const deleteTodoController = async (req, res) => {
  const { id: todoId } = req.params;
  const { _id: userId } = req.user;

  await deleteTodoById(todoId, userId);

  res.json({ status: "success" });
};

module.exports = {
  getTodosController,
  addTodoController,
  getTodoByIdController,
  changeTodoController,
  deleteTodoController,
};

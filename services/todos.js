const { Todo } = require("../model/todoModel");
const { WrongParametersError } = require("../helpers/errors");

const getTodos = async (userId) => {
  const todos = await Todo.find({ userId });

  return todos;
};

const getTodoById = async (todoId, userId) => {
  const todo = await Todo.findOne({ _id: todoId, userId });

  if (!todo) {
    throw new WrongParametersError(`Failure, no items with id '${id}' found!`);
  }

  return todo;
};

const addTodo = async ({ text }, userId) => {
  const todo = new Todo({ text, userId });
  await todo.save();
};

const changeTodoById = async (todoId, { text }, userId) => {
  await Todo.findOneAndUpdate({ _id: todoId, userId }, { $set: { text } });
};

const deleteTodoById = async (todoId, userId) => {
  await Todo.findOneAndRemove({ _id: todoId, userId });
};

module.exports = {
  getTodos,
  addTodo,
  getTodoById,
  changeTodoById,
  deleteTodoById,
};

const express = require("express");
const router = express.Router();

const {
  getTodosController,
  getTodoByIdController,
  addTodoController,
  changeTodoController,
  deleteTodoController,
} = require("../controllers/todosController");
const { asyncWrapper } = require("../helpers/errorWrapper");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addTodoValidation } = require("../middlewares/validation");

router.use(authMiddleware);

router.get("/", asyncWrapper(getTodosController));

router.get("/:id", asyncWrapper(getTodoByIdController));

router.post("/", addTodoValidation, asyncWrapper(addTodoController));

router.put("/:id", addTodoValidation, asyncWrapper(changeTodoController));

router.delete("/:id", asyncWrapper(deleteTodoController));

module.exports = { todosRouter: router };

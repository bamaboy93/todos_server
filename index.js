const express = require("express");
const logger = require("morgan");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = require("http").createServer(app);

const { connectMongo } = require("./db/connection");
const { todosRouter } = require("./routes/todosRouter.js");
const { authRouter } = require("./routes/authRouter.js");
const { errorHandler } = require("./helpers/errorWrapper");

app.use(express.json({ limit: 10000 }));
app.use(logger("tiny"));
app.use("/api/auth", authRouter);
app.use("/api/todos", todosRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    server.listen(PORT, (err) => {
      if (err) console.error("Error at aserver launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();

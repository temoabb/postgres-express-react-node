const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

// What does app use CORS ()) do?

// Calling use(cors()) will enable the express server to respond to preflight requests. A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.

// middleware
app.use(cors());
app.use(express.json()); // this is allowing us to give access to req.body and we can get json data.

// ROUTES

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]);
    res.json('Todo was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json(`Todo ${id} was deleted succesfully!`);
  } catch (err) {
    console.error(err);
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

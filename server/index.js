const express = require("express");
const app = express();
const cors = require('cors');

const pool = require('./db');

// What does app use CORS ()) do?

// Calling use(cors()) will enable the express server to respond to preflight requests. A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.


// middleware
app.use(cors());
app.use(express.json()); // this is allowing us to give access to req.body and we can get json data.


// ROUTES

// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1)", [description]);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});


// get all todos

// get a todo

// update a todo

// delete a todo

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
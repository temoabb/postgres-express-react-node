import axios from 'axios';
import { useEffect, useState } from "react";

import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/todos');
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllTodos();
  }, [])



  const onDeleteHandler = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/todos/${id}`);
    console.log(data);
    setTodos(prevTodos => prevTodos.filter(todo => todo.todo_id !== id));
    setMessageHandler(data);
  };

  const setMessageHandler = (payload) => setMessage(payload);

  return (
    <div>
      {message && (
        <div className="my-2 alert alert-primary" role="alert">
          {message}
        </div>
      )}
      {loading && <h1>Loading...</h1>}
      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col">todo_id</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <th scope="row">{todo.todo_id}</th>
              <td>{todo.description}</td>
              <td>
                <EditTodo
                  description={todo.description}
                  targetId={todo.todo_id}
                  message={setMessageHandler}
                />
              </td>
              <td><button onClick={onDeleteHandler.bind(null, todo.todo_id)} className="btn btn-danger">DELETE</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {todos && todos.map(todo => <div key={todo.todo_id}>{todo.description}</div>)} */}
    </div>
  )
};

export default ListTodos;
import { Fragment, useState } from "react";
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const { data } = await axios.post('http://localhost:5000/todos', body);
      console.log('data', data);

      window.location = '/';

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5" >Pern List todo</h1>
      <form onSubmit={submitHandler} className="d-flex">
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <button type="submit" className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo;
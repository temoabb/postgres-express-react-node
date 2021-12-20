import axios from 'axios';
import { useState } from 'react';

const EditTodo = ({ description, targetId, message }) => {
  const [todoDescription, setTodoDescription] = useState(description);

  const onChangeHandler = e => setTodoDescription(e.target.value);

  const updateTodoDescription = async (targetId) => {
    const body = { description: todoDescription };
    const { data } = await axios.put(`http://localhost:5000/todos/${targetId}`, body);
    message(data);
    window.location = '/';
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id_${targetId}`}
      >
        Edit
      </button>

      <div
        onClick={() => setTodoDescription(description)}
        className="modal fade"
        id={`id_${targetId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Current description:</h5>
              <button
                onClick={() => setTodoDescription(description)}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={todoDescription} onChange={onChangeHandler} />
            </div>
            <div className="modal-footer">
              <button
                onClick={updateTodoDescription.bind(null, targetId)}
                type="button"
                className="btn btn-warning"
              >Update
              </button>
              <button
                onClick={() => setTodoDescription(description)}
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default EditTodo;
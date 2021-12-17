import { Fragment } from 'react';
import InputTodo from './components/InputTodo';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
      </div>
    </Fragment>
  );
}

export default App;

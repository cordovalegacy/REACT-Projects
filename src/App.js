import './App.css';
import Form from './components/todo_form';
import React, {useState} from 'react';

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (e) => {
    e.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    };

    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i !== delIdx;
    });

    setTodos(filteredTodos);
  }
  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if(idx === i) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <div id='container'>
        <form onSubmit={(e) => { 
          handleNewTodoSubmit(e); 
          }}>
          <h2>To Do List:</h2>
          <input onChange={(e) => {
            setNewTodo(e.target.value); 
            }} 
            type='text'
            value={newTodo}
          />
          <div>
            <button id='todo-add'>Add</button>
          </div>
        </form>

            <hr />

            <div id='todo-wrapper'>
        {
          todos.map((todo, i) => {
            const todoClasses = ['bold', 'italic'];

            if(todo.complete) {
              todoClasses.push('line-through');
            }

            return (
            <div id='todo-list' key={i}>
              <input onChange={(e) => {
                handleToggleComplete(i);
              }} checked={todo.complete} type="checkbox" />
              <span className={todoClasses.join(" ")}>{todo.text}</span>
              <button id="todo-delete" onClick={(e) => {
                handleTodoDelete(i);
              }}>Delete</button>
            </div>
            );
          })
        }
        </div>

      </div>
    </div>
  );
}

export default App;

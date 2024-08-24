// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodos);
  };

  const markAsDone = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: true } : todo
    );
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    const newTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editText } : todo
    );
    setTodos(newTodos);
    setEditIndex(null);
    setEditText('');
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData('text/plain');
    const todoList = [...todos];
    const [movedTodo] = todoList.splice(fromIndex, 1);
    todoList.splice(index, 0, movedTodo);
    setTodos(todoList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-list">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo} className="add">Add</button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos"
      />
      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            className={todo.done ? 'done' : ''}
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
              />
            ) : (
              <>
                <span onClick={() => toggleDone(index)}>{todo.text}</span>
                <button className="icon-button" onClick={() => startEdit(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 3.5l4 4-1.5 1.5-4-4L16 3.5zM2 17v4h4l10.5-10.5L6.5 6 2 17z"></path>
                  </svg>
                </button>
                <button className="icon-button" onClick={() => deleteTodo(index)}>
                <svg viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1z"></path></svg>
                </button>
                {!todo.done && (
                  <button className="icon-button" onClick={() => markAsDone(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6l-12 12-5-5"></path>
                    </svg>
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

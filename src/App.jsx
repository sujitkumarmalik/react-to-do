import React from 'react'
import TodoList from './TodoList'

const App = () => {
  const headerStyle = {
    color: '#333',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'blue',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  };
  return (
    <div className="App">
    <h1 style={headerStyle}>Todo List</h1>
    <TodoList/>
  </div>
  )
}

export default App
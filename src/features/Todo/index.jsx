import React, { useState } from 'react';
import TodoList from '../Todo/components/TodoList';
import TodoForm from './components/TodoForm';

const TodoFeature = (props) => {
  const intiTodoList = [
    { id: 1, title: 'Eat', status: 'pending' },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'pending',
    },
  ];
  const [todoList, setTodoList] = useState(intiTodoList);

  const [filterStatus, setFilterStatus] = useState('all');

  const handleTodoClick = (todo, idx) => {
    const newTodoList = [...todoList];

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'pending' ? 'completed' : 'pending',
    };

    setTodoList(newTodoList);
  };

  const handleShowAllClick = () => {
    setFilterStatus('all');
  };
  const handleShowCompletedClick = () => {
    setFilterStatus('completed');
  };
  const handleShowPendingClick = () => {
    setFilterStatus('pending');
  };

  const renderedTodoList = todoList.filter((todo) => filterStatus === 'all' || todo.status === filterStatus);

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>Todo Form</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <h3>Todo List</h3>
      <TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleShowAllClick}>Show All</button>
        <button onClick={handleShowCompletedClick}>Show Completed</button>
        <button onClick={handleShowPendingClick}>Show Pending</button>
      </div>
    </div>
  );
};

export default TodoFeature;

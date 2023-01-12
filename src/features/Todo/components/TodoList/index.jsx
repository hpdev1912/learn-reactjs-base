import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const TodoList = ({ todoList, onTodoClick }) => {
  const handleTodoClick = (todo, idx) => {
    if (!onTodoClick) return;

    onTodoClick(todo, idx);
  };
  return (
    <ul className="todo-list">
      {todoList.map((todo, idx) => (
        <li
          className={classNames({
            'todo-item': true,
            completed: todo.status === 'completed' ? true : false,
          })}
          key={todo.id}
          onClick={() => handleTodoClick(todo, idx)}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array,
};

TodoList.defaultProps = {
  todoList: [],
};

export default TodoList;

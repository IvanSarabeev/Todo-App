import React from "react";
import { Todo } from "../../model";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="w-11/12 flex flex-wrap justify-evenly">
      {todos.map((todo) => (
        <li>{todo.todo}</li>
      ))}
    </div>
  );
};

export default TodoList;

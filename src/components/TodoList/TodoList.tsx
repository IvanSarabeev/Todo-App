import React from "react";
import { Todo } from "../../model/model";
import CardTodo from "../Card/CardTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="w-11/12 flex flex-wrap justify-evenly">
      {todos.map((todo) => (
        <CardTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;

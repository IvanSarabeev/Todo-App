import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model/model";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const CardTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatus = () => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      className="w-10/12 md:w-8/12 lg:w-4/12 flex rounded-md p-5 mt-4 transition-all duration-200 bg-todo-box hover:scale-105 hover:shadow-xl"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="flex-1 p-1 text-xl  border-none focus:outline-none"
        />
      ) : todo.isDone ? (
        <span className="todo-card underline underline-offset-2">
          {todo.todo}
        </span>
      ) : (
        <span className="todo-card">{todo.todo}</span>
      )}
      <div className="flex items-center">
        <span className="icons">
          <button type="button" onClick={() => handleComplete(todo.id)}>
            <MdOutlineFileDownloadDone />
          </button>
        </span>
        <span className="icons">
          <button type="button" onClick={() => handleStatus}>
            <AiFillEdit />
          </button>
        </span>
        <span className="icons">
          <button type="button" onClick={() => handleRemove(todo.id)}>
            <AiTwotoneDelete />
          </button>
        </span>
      </div>
    </form>
  );
};

export default CardTodo;

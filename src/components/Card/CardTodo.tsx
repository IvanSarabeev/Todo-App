import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/model";
import { GiCheckMark } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const CardTodo = ({ todo, todos, index, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

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

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          className={`${snapshot.isDragging ? "shadow-lg" : ""}
          w-auto flex items-center rounded-md p-5 mt-4 transition-all duration-200 bg-todo-box hover:scale-[1.03] hover:shadow-2xl`}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="flex-1 p-1 text-xl  border-none focus:outline-none"
            />
          ) : todo.isDone ? (
            <s className="todo-card underline underline-offset-2">
              {todo.todo}
            </s>
          ) : (
            <span className="todo-card">{todo.todo}</span>
          )}
          <div className="flex items-center">
            <span className="icons">
              <button type="button" onClick={() => handleComplete(todo.id)}>
                <GiCheckMark className="h-5 w-5" />
              </button>
            </span>
            <span className="icons">
              <button type="button" onClick={handleStatus}>
                <FaEdit className="h-5 w-5" />
              </button>
            </span>
            <span className="icons">
              <button type="button" onClick={() => handleRemove(todo.id)}>
                <AiTwotoneDelete />
              </button>
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default CardTodo;

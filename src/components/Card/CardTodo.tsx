import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../models/model";
import { GiCheckMark } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete, AiOutlineFileDone } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import Modal from "../Modal/Modal";

type Props = {
  todo: Todo;
  todos: Todo[];
  index: number;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const CardTodo = ({ todo, todos, index, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleModal = () => {
    setIsActive(!isActive);
  };

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

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot) => (
          <form
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onSubmit={(e) => handleEdit(e, todo.id)}
            className={`${snapshot.isDragging ? "shadow-lg" : ""}
          text-white w-auto flex items-center rounded-md p-5 mt-4 transition-all duration-200 bg-todo-box object-contain hover:scale-[1.03] hover:shadow-2xl`}
          >
            {edit ? (
              <input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="flex-1 p-1 pl-2 text-lg rounded-lg mx-2 text-black border-none focus:outline-none"
              />
            ) : todo.isDone ? (
              <span className="todo-card flex gap-x-1 items-center line-through">
                <AiOutlineFileDone className="text-green-500/90 h-6 w-6" />
                {todo.todo}
              </span>
            ) : (
              <span className="todo-card">{todo.todo}</span>
            )}
            <div className="flex items-center">
              <span className="icons">
                <button type="button" onClick={() => handleComplete(todo.id)}>
                  <GiCheckMark className="h-4 w-4" />
                </button>
                <button type="button" onClick={handleStatus}>
                  <FaEdit className="h-4 w-4" />
                </button>
                <button type="button" onClick={handleModal}>
                  <AiTwotoneDelete className="h-5 w-5" />
                </button>
              </span>
            </div>
            {isActive ? (
              <Modal
                todo={todo}
                todos={todos}
                isActive={isActive}
                setTodos={setTodos}
                setIsActive={setIsActive}
              />
            ) : null}
          </form>
        )}
      </Draggable>
    </>
  );
};

export default CardTodo;

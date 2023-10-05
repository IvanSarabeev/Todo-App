import React from "react";
import { Todo } from "../../models/model";
import { ReactComponent as InfoMark } from "../../assets/svgs/info.svg";
import { ReactComponent as XMarkSvg } from "../../assets/svgs/xMark.svg";

type Props = {
  todo: Todo;
  todos: Todo[];
  isActive: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ todo, todos, isActive, setIsActive, setTodos }: Props) => {
  const handleRemove = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="absolute block inset-x-0 mx-auto w-full max-w-md max-h-full z-20">
      <div className="relative rounded-lg shadow bg-slate-700">
        <button
          type="button"
          onClick={() => {
            handleToggle();
          }}
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <XMarkSvg />
        </button>
        <article className="p-6 text-center">
          <InfoMark />
          <h3 className="mb-5 text-lg font-normal text-gray-300">
            Are you sure you want to delete this task?
          </h3>
          <button
            type="button"
            onClick={() => handleRemove(todo.id)}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            type="button"
            onClick={() => {
              handleToggle();
            }}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
          >
            No, cancel
          </button>
        </article>
      </div>
    </div>
  );
};

export default Modal;

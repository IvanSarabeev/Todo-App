import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="w-11/12 relative flex text-center"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        value={todo}
        ref={inputRef}
        placeholder="Enter a task"
        onChange={(e) => setTodo(e.target.value)}
        className="w-full relative rounded-full py-5 px-7 text-2xl border-none transition-all shadow-md focus:shadow-2xl focus:outline-none focus:backdrop-blur-3xl"
      />
      <button
        type="submit"
        className="absolute w-12 h-12 m-3 rounded-full right-0 border-none text-base bg-[#2f74c0] text-white transition-all shadow-lg hover:bg-[#388ae2] active:scale-90 active:shadow-sm"
      >
        Go
      </button>
    </form>
  );
};

export default InputField;

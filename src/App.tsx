import React, { useState } from "react";
import InputField from "./components/Input/InputField";
import { Todo } from "./model/model";
import TodoList from "./components/TodoList/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center bg-gradient-to-tr from-[#2f74c0] via-slate-700 to-sky-500">
      <h1 className="capitalize font-serif font-semibold text-3xl lg:text-4xl text-center my-4 lg:my-8 mx-auto z-10">
        Taskify
      </h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </main>
  );
};

export default App;

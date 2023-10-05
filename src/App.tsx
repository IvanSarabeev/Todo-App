import React, { useState } from "react";
import InputField from "./components/Input/InputField";
import { Todo } from "./models/model";
import TodoList from "./components/TodoList/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination?.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    if (source.droppableId === "ActiveTodos") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "ActiveTodos") {
      active.splice(destination?.index, 0, add);
    } else if (destination.droppableId === "RemovedTodo") {
      complete.splice(destination?.index, 0, add);
    } else {
      console.log("Error");
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <main className="h-screen w-screen flex flex-col items-center bg-gradient-to-tr from-indigo-700 from-10% via-sky-900 via-30% to-teal-400 to-90%">
        <h1 className="font-semibold text-3xl lg:text-4xl text-center my-4 lg:my-8 mx-auto z-10">
          Taskify
        </h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </main>
    </DragDropContext>
  );
};

export default App;

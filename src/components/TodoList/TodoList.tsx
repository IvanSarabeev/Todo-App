import React from "react";
import { Todo } from "../../models/model";
import CardTodo from "../Card/CardTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Array<Todo>;
  completedTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  completedTodos,
  setTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <section className="w-11/12 gap-6 sm:gap-8 flex flex-col md:flex-row items-center md:items-start justify-between mt-3">
      <Droppable droppableId="ActiveTodos">
        {(provided, snapshot) => (
          <article
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${snapshot.isDraggingOver ? "bg-[#ddecff]" : ""}
            w-full flex flex-col p-4 rounded-lg bg-[#32c3cd]`}
          >
            <h2 className="todo-headings sm:text-xl md:text-2xl lg:text-3xl">
              Active Tasks
            </h2>
            {todos?.map((todo, index) => (
              <CardTodo
                key={todo.id}
                index={index}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </article>
        )}
      </Droppable>
      <Droppable droppableId="RemovedTodo">
        {(provided, snapshot) => (
          <aside
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${
              snapshot.isDraggingOver ? "bg-[#ff2600]" : "bg-[#eb6750]"
            }
            w-full flex flex-col p-4 rounded-lg bg-[#eb6750]`}
          >
            <h2 className="todo-headings sm:text-xl md:text-2xl lg:text-3xl">
              Completed Tasks
            </h2>
            {completedTodos?.map((todo, index) => (
              <CardTodo
                key={todo.id}
                index={index}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </aside>
        )}
      </Droppable>
    </section>
  );
};

export default TodoList;

import { useReducer } from "react";
import { Actions, Todo } from "../../models/model";

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    }
    case "edit": {
      return state.map((todo) =>
        todo.id !== action.payload
          ? {
              ...todo,
              isDone: false,
            }
          : !todo.isDone
      );
    }
    case "remove": {
      return state.filter((todo) => todo.id !== action.payload);
    }
    default:
      return state;
  }
};

export default function todoReducer() {
  //   const [state, dispatch] = useReducer<>(TodoReducer, []);
}

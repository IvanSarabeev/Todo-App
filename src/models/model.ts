export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export type Actions =
  | { type: "add"; payload: string }
  | { type: "edit"; payload: number }
  | { type: "remove"; payload: number };

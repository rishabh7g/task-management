import { useReducer } from "react";
import { Task, TaskCategory, TaskFieldType } from "src/types/task.types";

type TaskAction = {
  type: TaskFieldType;
  payload: string;
};

const taskReducer = (state: Task, action: TaskAction) => {
  switch (action.type) {
    case TaskFieldType.TITLE:
      return { ...state, title: action.payload };
    case TaskFieldType.DESCRIPTION:
      return { ...state, description: action.payload };
    case TaskFieldType.CATEGORY:
      return { ...state, category: action.payload as TaskCategory };
    default:
      return state;
  }
};

export const useTaskFormManagement = (
  onSubmit: (task: Task) => void,
  initialTask: Task,
) => {
  const [task, taskDispatch] = useReducer(taskReducer, initialTask);

  const handleChange = (value: string, name: TaskFieldType) => {
    taskDispatch({ type: name, payload: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isTaskEmpty = task.title === "" || task.description === "";
    if (isTaskEmpty) {
      alert("Title and description are required");
      return;
    }
    onSubmit(task);
  };

  return {
    task,
    handleChange,
    handleSubmit,
  };
};

import { useReducer } from "react";
import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import Form from "src/components/form/Form";
import Input from "src/components/input/Input";
import Select from "src/components/select/Select";
import {
  Task,
  TaskCategory,
  TaskFieldType,
  TaskStatus,
} from "src/types/task.types";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
}

const EMPTY_TASK: Task = {
  id: 0,
  title: "",
  description: "",
  category: TaskCategory.WORK,
  status: TaskStatus.TODO,
};

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

const TaskForm = ({ initialTask = EMPTY_TASK, onSubmit }: TaskFormProps) => {
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

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Title"
        name={TaskFieldType.TITLE}
        type="text"
        value={task.title}
        onChange={(e) => handleChange(e.target.value, TaskFieldType.TITLE)}
      />
      <Input
        label="Description"
        name={TaskFieldType.DESCRIPTION}
        type="text"
        value={task.description}
        onChange={(e) =>
          handleChange(e.target.value, TaskFieldType.DESCRIPTION)
        }
      />
      <Select
        label="Category"
        name={TaskFieldType.CATEGORY}
        options={Object.values(TaskCategory)}
        handleChange={(value: string) =>
          handleChange(value, TaskFieldType.CATEGORY)
        }
      />
      <PrimaryButton
        label="Submit"
        type={ButtonType.Submit}
        className="mt-4 w-full"
      />
    </Form>
  );
};

export default TaskForm;

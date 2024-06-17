import { useState } from "react";
import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import Form from "src/components/form/Form";
import Input from "src/components/input/Input";
import { Task } from "src/types/task.types";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
}

const INITIAL_TASK: Task = {
  id: 0,
  title: "",
  description: "",
  category: "",
  status: "",
};

const TaskForm = ({ initialTask = INITIAL_TASK, onSubmit }: TaskFormProps) => {
  const [task, setTask] = useState<Task>(initialTask);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        type="text"
        value={task.title}
        onChange={handleChange}
      />
      <Input
        label="Description"
        name="description"
        type="text"
        value={task.description}
        onChange={handleChange}
      />
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="category"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={task.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <PrimaryButton
        label="Submit"
        type={ButtonType.Submit}
        className="mt-4 w-full"
        onClick={() => {}}
      />
    </Form>
  );
};

export default TaskForm;

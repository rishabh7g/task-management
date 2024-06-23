import { PrimaryButton } from "src/components/button/Button";
import { ButtonType } from "src/components/button/common/types/Button.types";
import Form from "src/components/form/Form";
import Input from "src/components/input/Input";
import Select from "src/components/select/Select";
import { useTaskFormManagement } from "src/components/task-form/common/hooks/task-form.management";
import {
  Task,
  TaskCategory,
  TaskFieldType,
  TaskStatus,
} from "src/types/task.types";

const EMPTY_TASK: Task = {
  id: 0,
  title: "",
  description: "",
  category: TaskCategory.WORK,
  status: TaskStatus.TODO,
};

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
}

const TaskForm = ({ initialTask = EMPTY_TASK, onSubmit }: TaskFormProps) => {
  const { task, handleChange, handleSubmit } = useTaskFormManagement(
    onSubmit,
    initialTask,
  );

  const Title = () => (
    <Input
      label="Title"
      name={TaskFieldType.TITLE}
      type="text"
      value={task.title}
      onChange={(e) => handleChange(e.target.value, TaskFieldType.TITLE)}
    />
  );

  const Description = () => (
    <Input
      label="Description"
      name={TaskFieldType.DESCRIPTION}
      type="text"
      value={task.description}
      onChange={(e) => handleChange(e.target.value, TaskFieldType.DESCRIPTION)}
    />
  );

  const Category = () => (
    <Select
      label="Category"
      name={TaskFieldType.CATEGORY}
      options={Object.values(TaskCategory)}
      handleChange={(value: string) =>
        handleChange(value, TaskFieldType.CATEGORY)
      }
    />
  );

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Title />
      <Description />
      <Category />
      <PrimaryButton
        label="Submit"
        type={ButtonType.Submit}
        className="mt-4 w-full"
      />
    </Form>
  );
};

export default TaskForm;

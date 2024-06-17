import { SecondaryButton } from "src/components/button/Button";
import { Task } from "src/types/task.types";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="rounded bg-white p-4 shadow">
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <div className="mt-2">
            <SecondaryButton
              label="Edit"
              onClick={() => onEdit(task)}
              className="mr-2"
            />
            <SecondaryButton label="Delete" onClick={() => onDelete(task.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

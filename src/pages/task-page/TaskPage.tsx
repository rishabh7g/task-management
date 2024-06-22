import TaskForm from "src/components/task-form/TaskForm";
import TaskList from "src/components/task-list/TaskList";
import { useTaskPageManagement } from "src/pages/task-page/common/hooks/task-page.management";

const TaskPage = () => {
  const {
    tasks,
    editingTask,
    setEditingTask,
    handleTaskSubmit,
    handleDeleteTask,
  } = useTaskPageManagement();

  return (
    <div className="w-full max-w-md space-y-8 rounded bg-white p-10 shadow">
      <h2 className="mb-4 text-2xl font-bold">Task Management</h2>
      <TaskForm initialTask={editingTask} onSubmit={handleTaskSubmit} />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TaskPage;

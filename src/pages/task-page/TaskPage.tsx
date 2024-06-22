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
    <section className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Task Management</h2>
        <TaskForm initialTask={editingTask} onSubmit={handleTaskSubmit} />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </section>
  );
};

export default TaskPage;

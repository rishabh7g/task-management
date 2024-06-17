import { useState } from "react";
import TaskForm from "src/components/task-form/TaskForm";
import TaskList from "src/components/task-list/TaskList";
import { Task } from "src/types/task.types";

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task>();

  const handleCreateTask = (task?: Task) => {
    const isTaskEmpty = !task;
    if (isTaskEmpty) return;
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const handleEditTask = (task?: Task) => {
    const isTaskEmpty = !task;
    if (isTaskEmpty) return;
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleTaskSubmit = (task: Task) => {
    if (task.id) {
      handleEditTask(task);
    } else {
      handleCreateTask(task);
    }
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">Task Management</h2>
        <TaskForm initialTask={editingTask} onSubmit={handleTaskSubmit} />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default TaskManagementPage;

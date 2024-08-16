import React from 'react';
import { TaskList } from 'src/components/task-list/TaskList';
import { Task } from 'src/types/task.types';
import { ReadPromise } from 'src/util/promise.util';

interface TaskListUIProps {
    tasksResource?: ReadPromise<Task[]>;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
}

export const TaskListUI = ({
    tasksResource,
    onEdit,
    onDelete,
}: TaskListUIProps) => {
    const { tasks } = useTaskListManagement(tasksResource);

    return <TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />;
};

const useTaskListManagement = (tasksResource?: ReadPromise<Task[]>) => {
    const tasks: Task[] = tasksResource?.read() || [];

    return { tasks };
};

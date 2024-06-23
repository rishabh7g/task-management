import { useCallback, useEffect, useState } from 'react';
import { apiRoutes } from 'src/constant/api-routes';
import { useAxiosPrivate } from 'src/hooks/axios-private.hook';
import { Task } from 'src/types/task.types';

export const useTaskPageManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task>();
    const { apiClientPrivate } = useAxiosPrivate();

    const fetchTasks = useCallback(async () => {
        apiClientPrivate.get(apiRoutes.createTaskAddUrl()).then((response) => {
            const tasks = response.data;
            setTasks(tasks);
        });
    }, [apiClientPrivate]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = (task: Task) => {
        const isTaskEmpty = !task;
        if (isTaskEmpty) return;
        const { category, description, status, title } = task;
        apiClientPrivate
            .post(apiRoutes.createTaskAddUrl(), {
                category,
                description,
                status,
                title,
            })
            .then((response) => {
                const addTaskStatus = response.status;
                const isTaskAdded = addTaskStatus === 201;
                if (isTaskAdded) {
                    fetchTasks();
                }
            });
    };

    const handleEditTask = (task: Task) => {
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

    return {
        tasks,
        editingTask,
        setEditingTask,
        handleTaskSubmit,
        handleDeleteTask,
    };
};

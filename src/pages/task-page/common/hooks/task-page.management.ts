import { useCallback, useEffect, useState } from 'react';
import { apiRoutes } from 'src/constant/api-routes';
import { useAxiosPrivate } from 'src/hooks/axios-private.hook';
import { Task } from 'src/types/task.types';

export const useTaskPageManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task>();
    const { apiClientPrivate } = useAxiosPrivate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setEditingTask(undefined);
        setIsModalOpen(false);
    };

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
        const { description, status, title } = task;
        apiClientPrivate
            .post(apiRoutes.createTaskAddUrl(), {
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
        setEditingTask(task);
        openModal();
    };

    const handleDeleteTask = (taskId: number) => {
        alert(`${taskId} is getting deleted.`);
    };

    const handleTaskSubmit = (task: Task) => {
        handleCreateTask(task);
        closeModal();
    };

    return {
        tasks,
        editingTask,
        handleEditTask,
        handleTaskSubmit,
        handleDeleteTask,
        isModalOpen,
        closeModal,
        openModal,
    };
};

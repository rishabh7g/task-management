import { HttpStatusCode } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { apiRoutes } from 'src/constant/api-routes';
import { useAxiosPrivate } from 'src/hooks/axios-private.hook';
import { Task } from 'src/types/task.types';

export const useTaskPageManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task>();
    const { apiClientPrivate } = useAxiosPrivate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        clearForm();
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

    const handleCreateTask = async (task: Task) => {
        const isTaskEmpty = !task;
        if (isTaskEmpty) return;
        const { createdAt, description, status, title, updatedAt } = task;
        const response = await apiClientPrivate.post(
            apiRoutes.createTaskAddUrl(),
            { createdAt, description, status, title, updatedAt },
        );
        const addTaskStatus = response.status;
        const isTaskAdded = addTaskStatus === HttpStatusCode.Created;
        if (isTaskAdded) {
            fetchTasks();
        }
    };

    const updateEditingTask = (task: Task) => {
        setEditingTask(task);
        openModal();
    };

    const handleEditTask = async (task: Task) => {
        const { title, description, status } = task;
        await apiClientPrivate.put(apiRoutes.createTaskEditUrl(task.id), {
            title,
            description,
            status,
        });
    };

    const handleDeleteTask = async (taskId: string) => {
        await apiClientPrivate.delete(apiRoutes.createTaskDeleteUrl(taskId));
        await fetchTasks();
    };

    const handleTaskSubmit = async (task: Task) => {
        const isFreshTask = !task.id;
        setIsSubmitting(true);
        if (isFreshTask) {
            await handleCreateTask(task);
        } else {
            await handleEditTask(task);
        }
        setIsSubmitting(false);
        closeModal();
    };

    const clearForm = () => {
        setEditingTask(undefined);
    };

    const isTaskListEmpty = tasks.length === 0;

    return {
        tasks,
        editingTask,
        updateEditingTask,
        handleTaskSubmit,
        handleDeleteTask,
        isModalOpen,
        closeModal,
        openModal,
        isSubmitting,
        isTaskListEmpty,
    };
};

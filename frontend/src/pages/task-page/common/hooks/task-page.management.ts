import { HttpStatusCode } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { apiRoutes } from 'src/constant/api-routes';
import { useAxiosPrivate } from 'src/hooks/axios-private.hook';
import { Task } from 'src/types/task.types';

export const useTaskPageManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task>();
    const { apiClientPrivate } = useAxiosPrivate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showBoundary } = useErrorBoundary();
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        clearForm();
        setIsModalOpen(false);
    };

    const fetchTasks = useCallback(async () => {
        apiClientPrivate
            .get(apiRoutes.createTaskAddUrl())
            .then((response) => {
                const tasks = response.data;
                setTasks(tasks);
            })
            .catch((err) => showBoundary(err));
    }, [apiClientPrivate, showBoundary]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (task: Task) => {
        const isTaskEmpty = !task;
        if (isTaskEmpty) return;
        const { createdAt, status, title, updatedAt } = task;
        const response = await apiClientPrivate.post(
            apiRoutes.createTaskAddUrl(),
            { createdAt, status, title, updatedAt },
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
        const { title, status, createdAt, updatedAt } = task;
        await apiClientPrivate.put(apiRoutes.createTaskEditUrl(task.id), {
            title,
            status,
            createdAt,
            updatedAt,
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

import { useState } from 'react';
import { apiRoutes } from 'src/constant/api-routes';
import { apiClientPrivate } from 'src/services/api/api-service';
import { Task } from 'src/types/task.types';
import { wrapPromise } from 'src/util/promise.util';

export const useTaskPageManagement = () => {
    const [editingTask, setEditingTask] = useState<Task>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    const fetchTasks = () => {
        const url = apiRoutes.createTaskAddUrl();
        const tasksPromise = apiClientPrivate.get(url).then((response) => {
            return response.data;
        });
        return wrapPromise<Task[]>(tasksPromise);
    };

    const tasksResource = fetchTasks();

    const closeModal = () => {
        clearForm();
        setIsModalOpen(false);
    };

    const createNewTask = async (task: Task) => {
        const isTaskEmpty = !task;
        if (isTaskEmpty) return;
        const { createdAt, status, title, updatedAt } = task;
        await apiClientPrivate.post(apiRoutes.createTaskAddUrl(), {
            createdAt,
            status,
            title,
            updatedAt,
        });
        // const addTaskStatus = response.status;
        // const isTaskAdded = addTaskStatus === HttpStatusCode.Created;
        // if (isTaskAdded) {
        //     fetchTasks();
        // }
    };

    const handleTaskEdit = (task: Task) => {
        setEditingTask(task);
        openModal();
    };

    const editExistingTask = async (task: Task) => {
        const { title, status, createdAt, updatedAt } = task;
        await apiClientPrivate.put(apiRoutes.createTaskEditUrl(task.id), {
            title,
            status,
            createdAt,
            updatedAt,
        });
    };

    const handleTaskDelete = async (taskId: string) => {
        await apiClientPrivate.delete(apiRoutes.createTaskDeleteUrl(taskId));
        // await fetchTasks();
    };

    const handleTaskSubmit = async (task: Task) => {
        const isFreshTask = !task.id;
        setIsSubmitting(true);
        if (isFreshTask) {
            await createNewTask(task);
        } else {
            await editExistingTask(task);
        }
        setIsSubmitting(false);
        closeModal();
    };

    const clearForm = () => {
        setEditingTask(undefined);
    };

    return {
        editingTask,
        handleTaskEdit,
        handleTaskSubmit,
        handleTaskDelete,
        isModalOpen,
        closeModal,
        openModal,
        isSubmitting,
        tasksResource,
    };
};

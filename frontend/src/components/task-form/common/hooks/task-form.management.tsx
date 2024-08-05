import { useState } from 'react';
import { Task } from 'src/types/task.types';

export const useTaskFormManagement = (
    onSubmit: (task: Task) => void,
    task: Task,
    isSubmitting: boolean,
) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        task.title = title;
        task.description = description;
        const isTaskEmpty = task.title === '' || task.description === '';
        if (isTaskEmpty) {
            alert('Title and description are required');
            return;
        }
        // Check if task already have createdAt
        if (!task.createdAt) {
            task.createdAt = new Date();
        }
        task.updatedAt = new Date();

        onSubmit(task);
    };

    const isSubmitButtonDisabled =
        title === '' || description === '' || isSubmitting;

    return {
        title,
        setTitle,
        description,
        setDescription,
        handleSubmit,
        isSubmitButtonDisabled,
    };
};

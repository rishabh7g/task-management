import { useState } from 'react';
import { Task } from 'src/types/task.types';

export const useTaskFormManagement = (
    onSubmit: (task: Task) => void,
    task: Task,
    isSubmitting: boolean,
) => {
    const [title, setTitle] = useState(task.title);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        task.title = title;
        const isTaskEmpty = task.title === '';
        if (isTaskEmpty) {
            alert('Please enter task detail to proceed');
            return;
        }
        // Check if task already have createdAt
        if (!task.createdAt) {
            task.createdAt = new Date();
        }
        task.updatedAt = new Date();

        onSubmit(task);
    };

    const isSubmitButtonDisabled = title === '' || isSubmitting;

    return {
        title,
        setTitle,
        handleSubmit,
        isSubmitButtonDisabled,
    };
};

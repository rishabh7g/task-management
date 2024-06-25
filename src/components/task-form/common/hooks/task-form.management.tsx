import { useState } from 'react';
import { Task } from 'src/types/task.types';

export const useTaskFormManagement = (
    onSubmit: (task: Task) => void,
    task: Task,
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
        onSubmit(task);
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        handleSubmit,
    };
};

import React from 'react';
import { PrimaryButton } from 'src/components/button/Button';
import { ButtonType } from 'src/components/button/common/types/Button.types';
import { Form } from 'src/components/form/Form';
import { Input } from 'src/components/input/Input';
import { useTaskFormManagement } from 'src/components/task-form/common/hooks/task-form.management';
import { Task, TaskFieldType, TaskStatus } from 'src/types/task.types';

const EMPTY_TASK: Task = {
    id: '',
    title: '',
    description: '',
    status: TaskStatus.TODO,
};

interface TaskFormProps {
    initialTask?: Task;
    onSubmit: (task: Task) => void;
    isSubmitting: boolean;
}

export const TaskForm = ({
    initialTask = EMPTY_TASK,
    onSubmit,
    isSubmitting,
}: TaskFormProps) => {
    const {
        title,
        description,
        setTitle,
        setDescription,
        handleSubmit,
        isSubmitButtonDisabled,
    } = useTaskFormManagement(onSubmit, initialTask, isSubmitting);

    const TitleField = (
        <Input
            label='Title'
            name={TaskFieldType.TITLE}
            placeholder='Enter the task'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    );
    const DescriptionField = (
        <Input
            label='Description'
            name={TaskFieldType.DESCRIPTION}
            placeholder='Add more detail related to the task'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
    );

    return (
        <Form
            onSubmit={handleSubmit}
            className='flex w-96 max-w-md flex-col gap-5'
        >
            {TitleField}
            {DescriptionField}
            <PrimaryButton
                label={`${isSubmitting ? 'Submitting...' : 'Submit'}`}
                type={ButtonType.Submit}
                className='mt-4 w-full'
                disabled={isSubmitButtonDisabled}
            />
        </Form>
    );
};

import { Meta, StoryObj } from '@storybook/react';
import { TaskForm } from 'src/components/task-form/TaskForm';
import { TaskStatus } from 'src/types/task.types';

const meta: Meta<typeof TaskForm> = {
    title: 'UI/Components/TaskForm',
    component: TaskForm,
    tags: ['autodocs'],
    argTypes: {
        initialTask: { control: 'object' },
        isSubmitting: { control: 'boolean' },
        onSubmit: { action: 'onSubmit' },
    },
};

export default meta;

type Story = StoryObj<typeof TaskForm>;

export const Default: Story = {
    args: {
        initialTask: {
            id: '',
            title: '',
            status: TaskStatus.TODO,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        isSubmitting: false,
    },
};

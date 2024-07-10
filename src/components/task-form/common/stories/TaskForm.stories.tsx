import { Meta, StoryObj } from '@storybook/react';
import { TaskStatus } from 'src/types/task.types';
import { TaskForm } from '../../TaskForm';

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
            description: '',
            status: TaskStatus.TODO,
        },
        isSubmitting: false,
    },
};

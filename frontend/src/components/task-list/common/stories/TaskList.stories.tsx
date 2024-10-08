import { Meta, StoryObj } from '@storybook/react';
import { TaskList } from 'src/components/task-list/TaskList';
import { TaskStatus } from 'src/types/task.types';

const meta: Meta<typeof TaskList> = {
    title: 'UI/Components/TaskList',
    component: TaskList,
    tags: ['autodocs'],
    argTypes: {
        tasks: { control: 'object' },
        onEdit: { action: 'onEdit' },
        onDelete: { action: 'onDelete' },
    },
};

export default meta;

type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
    args: {
        tasks: [
            {
                id: '1',
                title: 'Task 1',
                status: TaskStatus.TODO,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    },
};

import { Meta, StoryObj } from '@storybook/react';
import { TaskList } from '../../TaskList';
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
                description: 'Task 1 description',
                status: TaskStatus.TODO,
            },
        ],
    },
};

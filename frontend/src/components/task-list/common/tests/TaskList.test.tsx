import React from 'react';
import { TaskList } from 'src/components/task-list/TaskList';
import { Task, TaskStatus } from 'src/types/task.types';
import { fireEvent, render, screen } from 'src/util/test-util';

const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Task 1',
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        title: 'Task 2',
        status: TaskStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('<TaskList />', () => {
    beforeEach(() => {
        render(
            <TaskList
                tasks={mockTasks}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />,
        );
    });

    it('renders task title', () => {
        mockTasks.forEach((task) => {
            expect(screen.getByText(task.title)).toBeInTheDocument();
        });
    });

    it('calls onEdit when edit button is clicked', () => {
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);

        fireEvent.click(editButtons[1]);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[1]);
    });

    it('calls onDelete when delete button is clicked', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[0].id);

        fireEvent.click(deleteButtons[1]);
        expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[1].id);
    });
});

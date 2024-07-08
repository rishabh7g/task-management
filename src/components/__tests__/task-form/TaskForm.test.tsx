import { fireEvent, render, screen } from '@testing-library/react';
import { TaskForm } from 'src/components/task-form/TaskForm';
import { Task, TaskStatus } from 'src/types/task.types';

const EMPTY_TASK: Task = {
    id: '',
    title: '',
    description: '',
    status: TaskStatus.TODO,
};

describe('<TaskForm />', () => {
    const onSubmit = jest.fn();
    const initialTask = EMPTY_TASK;
    const isSubmitting = false;

    beforeEach(() => {
        onSubmit.mockClear();
    });

    test('renders the form fields correctly', () => {
        render(
            <TaskForm
                initialTask={initialTask}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />,
        );

        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByLabelText('Description')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /submit/i }),
        ).toBeInTheDocument();
    });

    test('calls onSubmit with the correct data when the form is submitted', () => {
        render(
            <TaskForm
                initialTask={initialTask}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />,
        );

        fireEvent.change(screen.getByLabelText('Title'), {
            target: { value: 'New Task' },
        });
        fireEvent.change(screen.getByLabelText('Description'), {
            target: { value: 'Task description' },
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
            id: '',
            title: 'New Task',
            description: 'Task description',
            status: TaskStatus.TODO,
        });
    });

    test('displays "Submitting..." on the button when isSubmitting is true', () => {
        render(
            <TaskForm
                initialTask={initialTask}
                onSubmit={onSubmit}
                isSubmitting
            />,
        );

        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toHaveTextContent('Submitting...');
        expect(button).toBeDisabled();
    });
});

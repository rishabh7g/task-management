import { TaskForm } from 'src/components/task-form/TaskForm';
import { Task, TaskStatus } from 'src/types/task.types';
import { render, screen } from 'src/util/test-util';

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

    test('calls onSubmit with the correct data when the form is submitted', async () => {
        const { user } = render(
            <TaskForm
                initialTask={initialTask}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />,
        );

        const titleInput = screen.getByLabelText('Title');
        const descriptionInput = screen.getByLabelText('Description');
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await user.type(titleInput, 'New Task');
        await user.type(descriptionInput, 'Task description');
        await user.click(submitButton);

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

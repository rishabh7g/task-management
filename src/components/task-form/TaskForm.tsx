import { PrimaryButton } from 'src/components/button/Button';
import { ButtonType } from 'src/components/button/common/types/Button.types';
import Form from 'src/components/form/Form';
import Input from 'src/components/input/Input';
import { useTaskFormManagement } from 'src/components/task-form/common/hooks/task-form.management';
import { Task, TaskFieldType, TaskStatus } from 'src/types/task.types';

const EMPTY_TASK: Task = {
    id: 0,
    title: '',
    description: '',
    status: TaskStatus.TODO,
};

interface TaskFormProps {
    initialTask?: Task;
    onSubmit: (task: Task) => void;
}

export const TaskForm = ({
    initialTask = EMPTY_TASK,
    onSubmit,
}: TaskFormProps) => {
    const { title, description, setTitle, setDescription, handleSubmit } =
        useTaskFormManagement(onSubmit, initialTask);

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
                label='Submit'
                type={ButtonType.Submit}
                className='mt-4 w-full'
            />
        </Form>
    );
};

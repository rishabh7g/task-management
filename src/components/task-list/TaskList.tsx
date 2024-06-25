import { SecondaryButton } from 'src/components/button/Button';
import { Task } from 'src/types/task.types';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
    return (
        <div className='space-y-4'>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className='flex items-center justify-between rounded bg-white p-4 px-5 shadow'
                >
                    <div>
                        <h3 className='text-xl font-bold'>{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div>
                        <SecondaryButton
                            label='Edit'
                            onClick={() => onEdit(task)}
                            className='mr-2'
                            aria-label={`Edit task: ${task.title}`}
                        />
                        <SecondaryButton
                            label='Delete'
                            onClick={() => onDelete(task.id)}
                            aria-label={`Delete task: ${task.title}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

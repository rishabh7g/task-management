import { PrimaryButton } from 'src/components/button/Button';
import { Modal } from 'src/components/modal/Modal';
import { TaskForm } from 'src/components/task-form/TaskForm';
import { TaskList } from 'src/components/task-list/TaskList';
import { useTaskPageManagement } from 'src/pages/task-page/common/hooks/task-page.management';

const TaskPage = () => {
    const {
        tasks,
        editingTask,
        updateEditingTask,
        handleTaskSubmit,
        handleDeleteTask,
        openModal,
        isModalOpen,
        closeModal,
    } = useTaskPageManagement();

    return (
        <div className='mx-auto w-full max-w-7xl p-4'>
            <div className='flex justify-end'>
                <PrimaryButton
                    onClick={openModal}
                    className='mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    aria-haspopup='dialog'
                    aria-expanded={isModalOpen}
                    label='Add Task'
                />
            </div>
            <TaskList
                tasks={tasks}
                onEdit={updateEditingTask}
                onDelete={handleDeleteTask}
            />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskForm
                    initialTask={editingTask}
                    onSubmit={handleTaskSubmit}
                />
            </Modal>
        </div>
    );
};

export default TaskPage;

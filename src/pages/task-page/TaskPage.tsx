import React from 'react';
import { PrimaryButton } from 'src/components/button/Button';
import { Modal } from 'src/components/modal/Modal';
import { TaskForm } from 'src/components/task-form/TaskForm';
import { TaskList } from 'src/components/task-list/TaskList';
import { useTaskPageManagement } from 'src/pages/task-page/common/hooks/task-page.management';

export const TaskPage = () => {
    const {
        tasks,
        editingTask,
        updateEditingTask,
        handleTaskSubmit,
        handleDeleteTask,
        openModal,
        isModalOpen,
        closeModal,
        isSubmitting,
        isTaskListEmpty,
    } = useTaskPageManagement();

    const AddTaskButton = (
        <PrimaryButton
            onClick={openModal}
            className='mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            aria-haspopup='dialog'
            aria-expanded={isModalOpen}
            label='Add Task'
        />
    );

    const EmptyListUI = (
        <div className='mx-auto w-1/3 rounded bg-white p-10 text-center'>
            <h3 className='mb-5 text-lg'>
                {`it seems your task list is empty, let's add some tasks!`}
            </h3>
            {AddTaskButton}
        </div>
    );

    const TaskListUI = (
        <>
            <div className='flex justify-end'>{AddTaskButton}</div>
            <TaskList
                tasks={tasks}
                onEdit={updateEditingTask}
                onDelete={handleDeleteTask}
            />
        </>
    );

    return (
        <div className='mx-auto w-full max-w-7xl p-4'>
            {isTaskListEmpty ? EmptyListUI : TaskListUI}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <TaskForm
                    initialTask={editingTask}
                    onSubmit={handleTaskSubmit}
                    isSubmitting={isSubmitting}
                />
            </Modal>
        </div>
    );
};

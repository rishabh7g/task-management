import React from 'react';
import { AsyncUIWrapper } from 'src/components/async-ui-wrapper/async-ui-wrapper';
import { PrimaryButton } from 'src/components/button/Button';
import { Modal } from 'src/components/modal/Modal';
import { TaskForm } from 'src/components/task-form/TaskForm';
import { TaskListUI } from 'src/pages/task-page/common/components/task-list-ui/TaskListUI';
import { useTaskPageManagement } from 'src/pages/task-page/common/hooks/task-page.management';

export const TaskPage = () => {
    const {
        editingTask,
        handleTaskEdit,
        handleTaskSubmit,
        handleTaskDelete,
        openModal,
        isModalOpen,
        closeModal,
        isSubmitting,
        tasksResource,
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

    // const EmptyListUI = (
    //     <div className='mx-auto w-1/3 rounded bg-white p-10 text-center'>
    //         <h3 className='mb-5 text-lg'>
    //             {`it seems your task list is empty, let's add some tasks!`}
    //         </h3>
    //         {AddTaskButton}
    //     </div>
    // );

    // if (isTaskListEmpty) {
    //     return EmptyListUI;
    // }

    const AddTaskModal = () => (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <TaskForm
                initialTask={editingTask}
                onSubmit={handleTaskSubmit}
                isSubmitting={isSubmitting}
            />
        </Modal>
    );

    return (
        <div className='mx-auto w-full max-w-7xl p-4'>
            <div className='flex justify-end'>{AddTaskButton}</div>
            <AsyncUIWrapper>
                <TaskListUI
                    onEdit={handleTaskEdit}
                    onDelete={handleTaskDelete}
                    tasksResource={tasksResource}
                />
            </AsyncUIWrapper>
            <AddTaskModal />
        </div>
    );
};

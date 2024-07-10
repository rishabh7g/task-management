import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../Modal';

const meta: Meta<typeof Modal> = {
    title: 'UI/Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        onClose: { action: 'onClose' },
        isOpen: { control: 'boolean' },
        children: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    args: {
        isOpen: true,
        children: 'This is a modal content',
    },
};

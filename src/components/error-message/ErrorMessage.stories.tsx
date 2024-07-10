import { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
    title: 'UI/Components/ErrorMessage',
    component: ErrorMessage,
    tags: ['autodocs'],
    argTypes: {
        errorMessage: {
            control: 'text',
            description: 'Error message to be displayed',
        },
        htmlRef: {
            control: 'object',
            description: 'Ref to the HTML element',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
    args: {
        errorMessage: 'This is an error message',
    },
};

export const EmptyError: Story = {
    args: {
        errorMessage: '',
    },
};

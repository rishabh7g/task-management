import { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

// Meta configuration for the Storybook
const meta: Meta<typeof ErrorMessage> = {
    title: 'Example/ErrorMessage',
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

// Default story
export const Default: Story = {
    args: {
        errorMessage: 'This is an error message.',
        htmlRef: { current: null }, // If you want to provide a ref example
    },
};

// Example story with empty error message
export const EmptyError: Story = {
    args: {
        errorMessage: '',
        htmlRef: { current: null }, // If you want to provide a ref example
    },
};

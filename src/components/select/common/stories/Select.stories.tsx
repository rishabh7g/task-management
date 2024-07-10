import { Meta, StoryObj } from '@storybook/react';
import Select from '../../Select';

export default {
    title: 'UI/Components/Select',
    component: Select,
    argTypes: {
        handleChange: { action: 'handleChange' },
    },
} as Meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        label: 'Select Label',
        name: 'select',
        options: ['Option 1', 'Option 2', 'Option 3'],
        defaultOption: 'Option 1',
    },
};

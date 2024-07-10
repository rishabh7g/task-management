import { Meta, StoryObj } from '@storybook/react';
import { Input } from 'src/components/input/Input';

const meta: Meta<typeof Input> = {
    title: 'UI/Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        name: { control: 'text' },
        placeholder: { control: 'text' },
        type: { control: 'text' },
        value: { control: 'text' },
        onChange: { action: 'onChange' },
        onFocus: { action: 'onFocus' },
        onBlur: { action: 'onBlur' },
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: 'Input Label',
        name: 'input',
        placeholder: 'Enter text',
        type: 'text',
        value: '',
    },
};

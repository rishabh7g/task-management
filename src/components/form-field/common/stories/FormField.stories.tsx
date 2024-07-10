import { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../../FormField';

const meta: Meta<typeof FormField> = {
    title: 'UI/Components/FormField',
    component: FormField,
    tags: ['autodocs'],
    argTypes: {
        id: { control: 'text' },
        label: { control: 'text' },
        name: { control: 'text' },
        placeholder: { control: 'text' },
        type: { control: 'text' },
        value: { control: 'text' },
        isValid: { control: 'boolean' },
        isFocused: { control: 'boolean' },
        onChange: { action: 'onChange' },
        onFocus: { action: 'onFocus' },
        onBlur: { action: 'onBlur' },
    },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
    args: {
        id: 'form-field',
        label: 'Form Field Label',
        name: 'formField',
        placeholder: 'Enter text',
        type: 'text',
        value: '',
        isValid: true,
        isFocused: false,
    },
};

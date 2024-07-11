import type { Meta, StoryObj } from '@storybook/react';
import {
    CheckboxInput,
    CheckboxValue,
} from 'src/components/checkbox-input/CheckboxInput';

const meta: Meta<typeof CheckboxInput> = {
    title: 'UI/Components/CheckboxInput',
    component: CheckboxInput,
    argTypes: {
        name: { control: 'text' },
        label: { control: 'text' },
        value: {
            control: {
                type: 'select',
                options: [
                    CheckboxValue.Checked,
                    CheckboxValue.Partial,
                    CheckboxValue.Unchecked,
                ],
            },
        },
        onChange: { action: 'changed' },
    },
};

export default meta;

export const Checked: StoryObj<typeof CheckboxInput> = {
    args: {
        name: 'checkbox-checked',
        label: 'Checked Checkbox',
        value: CheckboxValue.Checked,
        onChange: () => {},
    },
};

export const Partial: StoryObj<typeof CheckboxInput> = {
    args: {
        name: 'checkbox-partial',
        label: 'Partial Checkbox',
        value: CheckboxValue.Partial,
        onChange: () => {},
    },
};

export const Unchecked: StoryObj<typeof CheckboxInput> = {
    args: {
        name: 'checkbox-unchecked',
        label: 'Unchecked Checkbox',
        value: CheckboxValue.Unchecked,
        onChange: () => {},
    },
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Form from 'src/components/form/Form';

const meta: Meta<typeof Form> = {
    title: 'UI/Components/Form',
    component: Form,
    argTypes: {
        onSubmit: { action: 'submitted' },
        className: { control: 'text' },
        children: { control: 'text' },
    },
};

export default meta;

export const Default: StoryObj<typeof Form> = {
    args: {
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        },
        className: 'form-class',
        children: 'Form Content',
    },
};

export const WithCustomContent: StoryObj<typeof Form> = {
    args: {
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        },
        className: 'form-class',
        children: (
            <>
                <label htmlFor='input-field'>Input Label</label>
                <input id='input-field' type='text' />
                <button type='submit'>Submit</button>
            </>
        ),
    },
};

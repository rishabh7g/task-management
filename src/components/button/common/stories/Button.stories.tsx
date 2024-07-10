import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import {
    Button,
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
} from '../../Button';

// Define the metadata for the Button stories
const meta: Meta<typeof Button> = {
    title: 'UI/Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        onClick: { action: 'clicked' },
        label: { control: 'text' },
        className: { control: 'text' },
        ariaLabel: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    args: {
        onClick: fn(),
    },
};

export default meta;

// Default Button story
export const Default: StoryObj<typeof Button> = {
    args: {
        label: 'Default Button',
        className: '',
        ariaLabel: 'default button',
        onClick: fn(),
        disabled: false,
    },
};

// Primary Button story
export const Primary: StoryObj<typeof PrimaryButton> = {
    args: {
        label: 'Primary Button',
        className: '',
        ariaLabel: 'primary button',
        disabled: false,
    },
    render: (args) => <PrimaryButton {...args} />,
};

// Secondary Button story
export const Secondary: StoryObj<typeof SecondaryButton> = {
    args: {
        label: 'Secondary Button',
        className: '',
        ariaLabel: 'secondary button',
        disabled: false,
    },
    render: (args) => <SecondaryButton {...args} />,
};

// Tertiary Button story
export const Tertiary: StoryObj<typeof TertiaryButton> = {
    args: {
        label: 'Tertiary Button',
        className: '',
        ariaLabel: 'tertiary button',
        disabled: false,
    },
    render: (args) => <TertiaryButton {...args} />,
};

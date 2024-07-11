import { Meta, StoryObj } from '@storybook/react';
import { Header } from 'src/components/header/Header';

const meta: Meta<typeof Header> = {
    title: 'UI/Components/Header',
    component: Header,
    tags: ['autodocs'],
    argTypes: {
        isUserLoggedIn: { control: 'boolean' },
    },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
    args: {
        isUserLoggedIn: true,
    },
};

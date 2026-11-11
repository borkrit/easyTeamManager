import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './';

const meta: Meta<typeof Input> = {
    title: 'Shared/UI/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'error'],
        },
        sizeVariant: {
            control: 'select',
            options: ['sm', 'md'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Wprowadź tekst...',
    },
};

export const WithError: Story = {
    args: {
        placeholder: 'Błędne pole...',
        hasError: true,
        defaultValue: 'Nieprawidłowa wartość',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 'Zablokowane pole',
    },
};
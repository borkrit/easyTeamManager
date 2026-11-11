import type { Meta, StoryObj } from '@storybook/react';
import { InputError } from './InputError';

const meta: Meta<typeof InputError> = {
    title: 'Shared/UI/InputError',
    component: InputError,
    tags: ['autodocs'],
    argTypes: {
        message: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof InputError>;

export const Default: Story = {
    args: {
        message: 'To pole jest wymagane.',
    },
};

export const LongMessage: Story = {
    args: {
        message: 'Wprowadzona wartość jest nieprawidłowa. Hasło musi zawierać co najmniej 8 znaków, jedną wielką literę oraz cyfrę.',
    },
};

export const Empty: Story = {
    args: {
        message: '',
    },
};
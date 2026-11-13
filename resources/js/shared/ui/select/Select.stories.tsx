import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Shared/Select',
    component: Select,
    tags: ['autodocs'],
    args: {
        placeholder: 'Wybierz opcję...',
        options: [
            { value: 'do_zrobienia', label: 'Do zrobienia' },
            { value: 'w_trakcie', label: 'W trakcie' },
            { value: 'zakonczone', label: 'Zakończone' },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithSelectedValue: Story = {
    args: {
        defaultValue: 'w_trakcie',
    },
};

export const WithError: Story = {
    args: {
        hasError: true,
        defaultValue: '',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 'do_zrobienia',
    },
};
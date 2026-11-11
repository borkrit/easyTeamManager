import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Shared/UI/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    argTypes: {
        hasError: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        rows: {
            control: { type: 'number', min: 1, max: 10 },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        placeholder: 'Wprowadź szczegółowy opis zadania...',
        rows: 4,
    },
};

export const WithError: Story = {
    args: {
        placeholder: 'Pole z błęдом...',
        hasError: true,
        defaultValue: 'Błędna zawartoсть opisu...',
        rows: 3,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 'Ten tekst jest zablokowany do edycji.',
        rows: 3,
    },
};
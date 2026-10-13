
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';


const meta: Meta<typeof Button> = {
  title: 'Shared/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;


export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Główny przycisk',
  },
};


export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Anuluj / Wróć',
  },
};


export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Usuń element',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Opcja dodatková',
  },
};

// Stan ładowania
export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Zapisywanie...',
  },
};

// Stan zablokowany
export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Niedostępny',
  },
};
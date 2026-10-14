import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

// Konfiguracja metadanych komponentu Badge w Storybook
const meta: Meta<typeof Badge> = {
  title: 'Shared/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'purple', 'custom'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    customBgColor: {
      control: 'color',
    },
    customTextColor: {
      control: 'color',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Podstawowy wariant domyślny
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Obserwator',
    size: 'md',
  },
};

// Wariant główny (primary)
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Menedżer projektu',
    size: 'md',
  },
};

// Wariant sukcesu
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Ukończone zadanie',
    size: 'md',
  },
};

// Wariant ostrzegawczy
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'W trakcie realizacji',
    size: 'md',
  },
};

// Wariant niebezpieczny / priorytetowy
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Wysoki priorytet',
    size: 'md',
  },
};

// Wariant fioletowy (np. Administrator)
export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'Administrator',
    size: 'md',
  },
};

// Różne rozmiary (Mały / Średni / Duży)
export const SmallSize: Story = {
  args: {
    variant: 'primary',
    children: 'Mała kapsułka',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'success',
    children: 'Duża kapsułka',
    size: 'lg',
  },
};

// Przykład z własnym, dynamicznym kolorem
export const CustomColor: Story = {
  args: {
    variant: 'custom',
    children: 'Własny kolor tła',
    customBgColor: '#ec4899', // Różowy z palety Tailwind
    customTextColor: '#ffffff',
    size: 'md',
  },
};
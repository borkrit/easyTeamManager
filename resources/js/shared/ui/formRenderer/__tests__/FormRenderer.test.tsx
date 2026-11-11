
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FormRenderer, FormFieldConfig } from '../';

const fields: FormFieldConfig[] = [
    {
        name: 'title',
        label: 'Tytuł',
        type: 'text',
        required: true,
        placeholder: 'Wpisz tytuł',
    },
];

describe('FormRenderer', () => {
    it('renders fields correctly and handles changes', () => {
        const handleChange = vi.fn();
        const data = { title: '' };
        const errors = {};

        render(
            <FormRenderer
                fields={fields}
                data={data}
                errors={errors}
                onChange={handleChange}
            />
        );

        const input = screen.getByPlaceholderText('Wpisz tytuł');
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Nowe zadanie' } });
        expect(handleChange).toHaveBeenCalledWith('title', 'Nowe zadanie');
    });

    it('displays validation error messages', () => {
        const errors = { title: 'To pole jest wymagane' };
        
        render(
            <FormRenderer
                fields={fields}
                data={{ title: '' }}
                errors={errors}
                onChange={() => {}}
            />
        );

        expect(screen.getByText('To pole jest wymagane')).toBeInTheDocument();
    });
});
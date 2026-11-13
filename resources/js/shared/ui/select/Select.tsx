import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const selectVariants = cva(
    'w-full bg-slate-950 border rounded-lg text-xs text-slate-100 focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default: 'border-slate-800 focus:border-indigo-500',
                error: 'border-red-500 focus:border-red-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement>,
        VariantProps<typeof selectVariants> {
    options: SelectOption[];
    placeholder?: string;
    hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', variant, hasError, options, placeholder, ...props }, ref) => {
        const computedVariant = hasError ? 'error' : variant;

        return (
            <select
                ref={ref}
                className={cn(selectVariants({ variant: computedVariant }), 'p-2.5', className)}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        );
    }
);

Select.displayName = 'Select';
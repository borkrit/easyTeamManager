import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
    'w-full bg-slate-950 border rounded-lg text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default: 'border-slate-800 focus:border-indigo-500',
                error: 'border-red-500 focus:border-red-500',
            },
            sizeVariant: {
                sm: 'px-2.5 py-1.5',
                md: 'px-3 py-2.5',
            },
        },
        defaultVariants: {
            variant: 'default',
            sizeVariant: 'md',
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', variant, sizeVariant, hasError, ...props }, ref) => {
        const computedVariant = hasError ? 'error' : variant;

        return (
            <input
                ref={ref}
                className={`${inputVariants({ variant: computedVariant, sizeVariant })} ${className}`}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';
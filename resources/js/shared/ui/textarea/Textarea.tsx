import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
    'w-full bg-slate-950 border rounded-lg text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed',
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

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', variant, hasError, rows = 3, ...props }, ref) => {
        const computedVariant = hasError ? 'error' : variant;

        return (
            <textarea
                ref={ref}
                rows={rows}
                className={`${textareaVariants({ variant: computedVariant })} p-2.5 ${className}`}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';
import React from 'react';
import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from 'class-variance-authority';

const backButtonVariants = cva(
    'inline-flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors group',
    {
        variants: {
            size: {
                sm: 'text-xs',
                md: 'text-sm',
                lg: 'text-base',
            },
        },
        defaultVariants: {
            size: 'sm',
        },
    }
);

export interface BackButtonProps
    extends Omit<React.ComponentPropsWithoutRef<typeof Link>, 'size'>,
        VariantProps<typeof backButtonVariants> {
    children?: React.ReactNode;
    wrapperClassName?: string;
}

export function BackButton({ 
    href, 
    size, 
    children = 'Wróć do listy', 
    className = '', 
    wrapperClassName = 'mb-6',
    ...props}: BackButtonProps) {
    return (
        <div className={wrapperClassName}>
            <Link href={href} className={backButtonVariants({ size, className })} {...props}>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {children}
            </Link>
        </div>
    );
}
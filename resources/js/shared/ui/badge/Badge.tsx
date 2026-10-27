import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

export type BadgeVariant = 'do_zrobienia' | 'w_trakcie' | 'zakonczone' | 'niski' | 'sredni' | 'wysoki' | 'default';

const badgeVariants = cva(
    'px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-colors',
    {
        variants: {
            variant: {
                do_zrobienia: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                w_trakcie: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                zakonczone: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                niski: 'bg-slate-800 text-slate-400 border-slate-700',
                sredni: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                wysoki: 'bg-rose-500/10 text-rose-400 border-rose-500/20 font-semibold',
                default: 'bg-slate-800 text-slate-300 border-slate-700',
            },
            size: {
                sm: 'px-2 py-0.5 text-[10px]',
                md: 'px-3 py-1 text-xs',
                lg: 'px-3.5 py-1.5 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {
    label?: string;
}

export function Badge({ className, variant, size, label, children, ...props }: BadgeProps) {
    return (
        <span className={badgeVariants({ variant, size, className })} {...props}>
            {label || children}
        </span>
    );
}
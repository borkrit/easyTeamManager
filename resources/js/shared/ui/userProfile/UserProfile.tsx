import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const userProfileVariants = cva('flex items-center group transition-all', {
    variants: {
        size: {
            sm: 'gap-2',
            md: 'gap-3',
            lg: 'gap-4',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const avatarVariants = cva('rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-semibold group-hover:border-indigo-400 group-hover:bg-indigo-600/30 transition-all', {
    variants: {
        size: {
            sm: 'h-7 w-7 text-xs',
            md: 'h-9 w-9 text-sm',
            lg: 'h-12 w-12 text-base',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

interface UserProfileProps extends VariantProps<typeof userProfileVariants> {
    name: string;
    email: string;
    className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    name,
    email,
    size = 'md',
    className = '',
}) => {
    const userInitial = name.charAt(0).toUpperCase() || 'A';

    return (
        <div className={`${userProfileVariants({ size })} ${className}`}>
            <div className="text-right hidden sm:block">
                <p className={`font-medium text-slate-200 group-hover:text-indigo-400 transition-colors ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
                    {name}
                </p>
                <p className={`text-slate-400 ${size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-sm' : 'text-xs'}`}>
                    {email}
                </p>
            </div>
            <div className={avatarVariants({ size })}>
                {userInitial}
            </div>
        </div>
    );
};
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export function Label({ children, className = '', required, ...props }: LabelProps) {
    return (
        <label
            className={`block text-xs font-medium text-slate-300 mb-1.5 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-400 ml-1">*</span>}
        </label>
    );
}
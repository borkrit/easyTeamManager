import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  customBgColor?: string;
  customTextColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  customBgColor,
  customTextColor,
}) => {
  const variantStyles = {
    default: 'bg-slate-800 text-slate-400 border border-slate-700',
    primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    custom: 'border border-transparent',
  };

  const sizeStyles = {
    sm: 'px-3 py-0.5 text-xs',
    md: 'px-4 py-1.5 text-sm',
    lg: 'px-5 py-2 text-base',
  };

  // Łączymy własne style z gwarantowanym zaokrągleniem przez style inline
  const inlineStyles: React.CSSProperties = {
    borderRadius: '9999px', // Gwarantowany efekt kapsułki niezależnie od CSS / Tailwind
    ...(customBgColor ? { backgroundColor: customBgColor } : {}),
    ...(customTextColor ? { color: customTextColor } : {}),
  };

  return (
    <span
      style={inlineStyles}
      className={`inline-flex items-center font-semibold shadow-sm ${
        variantStyles[variant]
      } ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};
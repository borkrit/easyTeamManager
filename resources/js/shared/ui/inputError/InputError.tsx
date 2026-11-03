interface InputErrorProps {
    message?: string;
    className?: string;
}

export function InputError({ message, className = '' }: InputErrorProps) {
    if (!message) return null;

    return <p className={`text-xs text-red-400 mt-1 ${className}`}>{message}</p>;
}
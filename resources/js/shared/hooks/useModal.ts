import { useState, useCallback } from 'react';

export function useModal<T = any>() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const openCreate = useCallback(() => {
        setData(null);
        setIsOpen(true);
    }, []);

    const openEdit = useCallback((item: T) => {
        setData(item);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setData(null);
    }, []);

    return {
        isOpen,
        data,
        openCreate,
        openEdit,
        close,
    };
}
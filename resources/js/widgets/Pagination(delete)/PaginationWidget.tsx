import React from 'react';
import { Pagination } from '@/shared/ui/pagination';
import { usePagination } from '@/shared/hooks/usePagination';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationWidgetProps {
    links: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
}

export function PaginationWidget({ links, from, to, total }: PaginationWidgetProps) {
    const { shouldShow, prevUrl, nextUrl } = usePagination(links);

    if (!shouldShow) {
        return null;
    }

    return (
        <Pagination
            links={links}
            from={from}
            to={to}
            total={total}
            prevUrl={prevUrl}
            nextUrl={nextUrl}
        />
    );
}
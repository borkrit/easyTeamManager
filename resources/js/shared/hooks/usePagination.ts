interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export function usePagination(links: PaginationLink[]) {
    if (!links || links.length <= 3) {
        return {
            shouldShow: false,
            prevUrl: null,
            nextUrl: null,
        };
    }
    const shouldShow = links && links.length > 3;
    const prevUrl = links[0]?.url;
    const nextUrl = links[links.length - 1]?.url;

    return {
        shouldShow,
        prevUrl,
        nextUrl,
    };
}
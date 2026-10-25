import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationUIProps {
    links: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
    prevUrl?: string | null;
    nextUrl?: string | null;
}

export function Pagination({ links, from, to, total, prevUrl, nextUrl }: PaginationUIProps) {
    return (
        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 sm:px-6 mt-4">
           
            <div className="flex flex-1 justify-between sm:hidden">
                {prevUrl ? (
                    <Link
                        href={prevUrl}
                        className="relative inline-flex items-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
                    >
                        Poprzednia
                    </Link>
                ) : <span />}
                
                {nextUrl ? (
                    <Link
                        href={nextUrl}
                        className="relative ml-3 inline-flex items-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700"
                    >
                        Następna
                    </Link>
                ) : <span />}
            </div>

            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    {total !== undefined && from !== undefined && to !== undefined && (
                        <p className="text-sm text-slate-400">
                            Pokazano od <span className="font-medium text-slate-200">{from || 0}</span> do{' '}
                            <span className="font-medium text-slate-200">{to || 0}</span> z{' '}
                            <span className="font-medium text-slate-200">{total}</span> wyników
                        </p>
                    )}
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {links.map((link, index) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-slate-900 border border-slate-800 cursor-not-allowed"
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors ${
                                        link.active
                                            ? 'z-10 bg-indigo-600 border-indigo-600 text-white focus:z-20'
                                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 focus:z-20'
                                    } ${index === 0 ? 'rounded-l-md' : ''} ${
                                        index === links.length - 1 ? 'rounded-r-md' : ''
                                    }`}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}
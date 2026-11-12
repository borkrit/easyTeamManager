import React, { useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { getPageTitleByUrl } from '@/shared/config/pageTitles';
import { UserProfile } from '@/shared/ui/UserProfile';

interface HeaderProps {
    userName?: string;
    userEmail?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName, userEmail }) => {
    const { url, auth } = usePage<any>().props;

    const name = userName || auth?.user?.name || 'Administrator';
    const email = userEmail || auth?.user?.email || 'admin@easyripok.pl';
    const currentUrl = url || '/dashboard';

    const title = useMemo(() => getPageTitleByUrl(currentUrl), [currentUrl]);

    return (
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-slate-100">{title}</h1>
            </div>

            <Link
                href="/profile"
                className="flex items-center p-1 rounded-lg hover:bg-slate-900/80 transition-colors group cursor-pointer"
            >
                <UserProfile name={name} email={email} />
            </Link>
        </header>
    );
};
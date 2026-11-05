/// <reference types="vite/client" />
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { AppLayout } from './app/layouts/AppLayout';
import React from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'EasyTeamManager';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page = pages[`./pages/${name}.tsx`] as any;
        
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }
        
        if (page.default && !page.default.layout) {
            page.default.layout = (pageNode: React.ReactNode) => <AppLayout>{pageNode}</AppLayout>;
        }
        
        return page; 
    },
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    
    progress: {
        color: '#4f46e5',
    },
});
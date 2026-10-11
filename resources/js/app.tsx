/// <reference types="vite/client" />
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'EasyRIPOK';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    
    
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        let page = pages[`./pages/${name}.tsx`];
        
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }
        
        return (page as any).default || page;
    },
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    
    progress: {
        color: '#4f46e5',
    },
});
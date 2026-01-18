import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist-widget',
        emptyOutDir: true,
        lib: {
            entry: 'src/widget.jsx',
            name: 'MedConciergeChat',
            fileName: (format) => `med-concierge-chat.js`,
            formats: ['iife'], // IIFE for direct script tag usage
        },
        rollupOptions: {
            // We bundle React/ReactDOM so the hosted site doesn't need to provide it
            // This increases size but ensures compatibility
        },
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    }
});

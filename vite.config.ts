import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

const theme = {
    extend: {
        opacity: {
            2: 0.02
        },
        screen: {
            sm: '505px'
        },
        colors: {
            cyan: {
                100: 'hsl(183 90% 90%)',
                200: 'hsl(183 90% 80%)',
                300: 'hsl(183 90% 70%)',
                400: 'hsl(183 90% 60%)',
                500: 'hsl(183 90% 50%)',
                600: 'hsl(183 90% 40%)',
                700: 'hsl(183 90% 30%)',
                800: 'hsl(183 90% 20%)',
                900: 'hsl(183 90% 10%)'
            }
        }
    }
};

export default {
    envPrefix: 'CLIENT',
    resolve: {
        alias: {
            src: path.resolve('./src')
        }
    },
    plugins: [
        svelte({
            preprocess: preprocess()
        })
    ],
    css: {
        postcss: {
            plugins: [
                tailwind({
                    mode: 'jit',
                    content: ['index.html', 'src/**/*.svelte'],
                    theme
                }),
                autoprefixer
            ]
        }
    },
    test: {
        globals: true,
        include: ['src/**/*.test.ts'],
        environment: 'jsdom'
    }
};

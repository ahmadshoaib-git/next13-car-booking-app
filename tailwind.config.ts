import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', '!./node_modules'],
    theme: {
        screens: {
            xs: '30rem',
            // => @media (min-width: 480px) { ... }
            sm: '40.625rem',
            // => @media (min-width: 650px) { ... }
            md: '49rem',
            // => @media (min-width: 786px) { ... }
            lg: '57.5rem',
            // => @media (min-width: 920px) { ... }
            '2lg': '67.5rem',
            // => @media (min-width: 1080px) { ... }
            xl: '72rem',
            // => @media (min-width: 1160px) { ... }
            '2xl': '80rem',
            // => @media (min-width: 1280px) { ... }
            '3xl': '96rem',
            // => @media (min-width: 1536px) { ... }
            '4xl': '110rem',
            // => @media (min-width: 1536px) { ... }
            '5xl': '124rem',
            '6xl': '138rem',
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.85rem',
            md: '1rem',
            lg: '1.25rem',
            xl: '1.4rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
            xxl: '7.5rem',
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                xs: '30rem',
                // => @media (min-width: 480px) { ... }
                sm: '40.625rem',
                // => @media (min-width: 650px) { ... }
                md: '49rem',
                // => @media (min-width: 786px) { ... }
                lg: '57.5rem',
                // => @media (min-width: 920px) { ... }
                '2lg': '67.5rem',
                // => @media (min-width: 1080px) { ... }
                xl: '72rem',
                // => @media (min-width: 1160px) { ... }
                '2xl': '80rem',
                // => @media (min-width: 1280px) { ... }
                '3xl': '96rem',
                // => @media (min-width: 1536px) { ... }
                '4xl': '110rem',
                // => @media (min-width: 1536px) { ... }
                '5xl': '124rem',
                '6xl': '138rem',
            },
        },
        extend: {
            colors: {
                whiteGrey: 'var(--whiteGrey)',
                lightGrey: 'var(--lightGrey)',
                darkGrey: 'var(--darkGrey)',
                smoke: 'var(--smoke)',
                darkBlue: 'var(--darkBlue)',
                black: 'var(--black)',
                cartRed: 'var(--cartRed)',
                cartRedLowOpacity: 'var(--cartRedLowOpacity)',
                lightOrange: 'var(--lightOrange)',
                blue: 'var(--blue)',
                yellow: 'var(--yellow)',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            fontWeight: {
                thin: '100',
                hairline: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                'extra-bold': '800',
                black: '900',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
    // safelist: ['bg-whiteGrey', 'text-whiteGrey', 'bg-lightGrey', 'text-lightGrey', 'bg-smoke', 'text-smoke', 'bg-yellow', 'text-yellow'],
    safelist: [
        {
            pattern: /(bg|text|border)-(Yellow|smoke)/,
        },
    ],
};
export default config;


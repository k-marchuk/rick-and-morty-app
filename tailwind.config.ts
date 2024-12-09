import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  screens: {
    sm: '360px',
    // => @media (min-width: 360px) { ... }

    md: '768px',
    // => @media (min-width: 768px) { ... }

    lg: '1280px',
    // => @media (min-width: 1280px) { ... }
  },

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui')],

  daisyui: {
    themes: ['lemonade', 'night', 'cupcake'],
  },
};
export default config;

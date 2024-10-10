import type { Config } from 'tailwindcss';
import pluginIoC from './src/styles/tailwind.plugins/pluginsIoC';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        pointColor: {
          100: 'var(--point-color-100)',
          200: 'var(--point-color-200)',
          300: 'var(--point-color-300)',
          400: 'var(--point-color-400)',
        },
      },
    },
  },
  plugins: pluginIoC,
};
export default config;

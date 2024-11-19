import { text } from 'stream/consumers';
import plugin from 'tailwindcss/plugin';

export const tag = plugin(function ({ addComponents }) {
  addComponents({
    '.tag': {
      fontSize: '0.75rem',
      padding: '0.5rem 0.75rem',
      textAlign: 'center',
      borderRadius: '0.5rem',
      color: 'var(--point-color-100)',
      fontWeight: 'bold',
      border: '2px solid var(--point-color-100)',
      '&:hover': {
        color: 'var(--point-color-200)',
      },
    },
  });
});

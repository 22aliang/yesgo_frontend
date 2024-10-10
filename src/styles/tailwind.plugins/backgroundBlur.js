import plugin from 'tailwindcss/plugin';

export const backgroundBlur = plugin(function ({ addComponents }) {
  addComponents({
    '.btn': {
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '600',
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: 'var(--point-color-100)',
      '&:hover': {
        backgroundColor: 'var(--point-color-200)',
        color: 'white',
      },
    },
    '.btn-secondary': {
      backgroundColor: 'gary-500',
      color: 'black',
      '&:hover': {
        backgroundColor: 'gary-800',
      },
    },
  });
});

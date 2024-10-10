import plugin from 'tailwindcss/plugin';

export const selectSection = plugin(function ({ addComponents }) {
  addComponents({
    '.selectSection': {
      color: 'black',
      '&:hover': {
        color: 'var(--point-color-200)',
      },
    },
  });
});

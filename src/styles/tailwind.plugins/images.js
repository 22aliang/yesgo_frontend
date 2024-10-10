import plugin from 'tailwindcss/plugin';

export const images = plugin(function ({ addComponents }) {
  addComponents({
    '.image': {
      Layout: 'fill',
      objectFit: 'contain',
    },
  });
});

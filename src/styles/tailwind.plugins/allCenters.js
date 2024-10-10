import plugin from 'tailwindcss/plugin';

export const allCenter = plugin(function ({ addUtilities }) {
  addUtilities({
    '.allCenter': {
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'center',
    },
  });
});

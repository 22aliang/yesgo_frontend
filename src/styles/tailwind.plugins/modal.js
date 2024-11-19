import plugin from 'tailwindcss/plugin';

export const modal = plugin(function ({ addComponents }) {
  addComponents({
    '.modal': {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      maxWidth: '90%',
      maxHeight: '90%',
      overflow: 'auto',
      zIndex: 1000,
    },
  });
});

import plugin from 'tailwindcss/plugin';

export const forms = plugin(function ({ addComponents }) {
  addComponents({
    '.form-input': {
      marginTop: '0.5rem',
      padding: '0.5rem',
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      color: 'black',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--primary-color)',
        borderColor: 'var(--primary-color)',
      },
    },
  });
});

import plugin from 'tailwindcss/plugin';

export const alert = plugin(function ({ addComponents }) {
  addComponents({
    '.modal': {
      '@apply absolute inset-0 flex items-center justify-center': {}, // Tailwind 的方式來設置 modal 居中
      '& .modal-content': {
        '@apply relative bg-white rounded-lg shadow-lg p-6': {}, // 使用 Tailwind 的 utility class
      },
      '& .modal-body': {
        '@apply flex items-center justify-center': {},
      },
    },
    '.ui-success-circle': {
      strokeDasharray: '260.75',
      strokeDashoffset: '260.75',
      transform: 'rotate(220deg)',
      transformOrigin: 'center center',
      strokeLinecap: 'round',
      animation: 'ani-success-circle 1s ease-in both',
    },
    '.ui-success-path': {
      strokeDasharray: '60px 64px',
      strokeDashoffset: '62px',
      strokeLinecap: 'round',
      animation: 'ani-success-path 0.4s 1s ease-in both',
    },
    '.ui-error-circle': {
      strokeDasharray: '260.75',
      strokeDashoffset: '260.75',
      animation: 'ani-error-circle 1.2s linear',
    },
    '.ui-error-line1, .ui-error-line2': {
      strokeDasharray: '54px 55px',
      strokeDashoffset: '55px',
      strokeLinecap: 'round',
      animation: 'ani-error-line 0.15s 1.2s linear both',
    },
    '@keyframes ani-success-circle': {
      to: { strokeDashoffset: '782.25' },
    },
    '@keyframes ani-success-path': {
      '0%': { strokeDashoffset: '62px' },
      '65%': { strokeDashoffset: '-5px' },
      '84%': { strokeDashoffset: '4px' },
      '100%': { strokeDashoffset: '-2px' },
    },
    '@keyframes ani-error-line': {
      to: { strokeDashoffset: '0' },
    },
    '@keyframes ani-error-circle': {
      '0%': { strokeDasharray: '0, 260.75', strokeDashoffset: '0' },
      '35%': { strokeDasharray: '120px, 120px', strokeDashoffset: '-120px' },
      '70%': { strokeDasharray: '0, 260.75', strokeDashoffset: '-260.75' },
      '100%': { strokeDasharray: '260.75, 0', strokeDashoffset: '-260.75' },
    },
  });
});

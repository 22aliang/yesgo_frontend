import plugin from 'tailwindcss/plugin';

export const dropdown = plugin(function ({ addComponents }) {
  addComponents({
    '.dropdown-ul': {
      position: 'absolute',
      right: '0', // Align to the right
      backgroundColor: 'white', // Background color
      border: '1px solid #D1D5DB', // Tailwind's gray-300
      padding: '0.5rem', // Padding Tailwind's p-2
      marginTop: '0.5rem', // Margin top Tailwind's mt-2
      borderRadius: '0.5rem', // Rounded corners Tailwind's rounded-lg
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow Tailwind's shadow-md
      width: '8rem', // Width Tailwind's w-40
      display: 'flex',
      flexDirection: 'column', // Flex direction column
      alignItems: 'center', // Center items horizontally
      textAlign: 'center', // Center text
      '.dropdown-ul-item': {
        display: 'flex',
        alignItems: 'center', // Align items in flexbox
        padding: '0.8rem 0.5rem', // Padding Tailwind's px-4 py-2
        '&:hover': {
          color: 'var(--point-color-100)',
        },
      },
    },
  });
});

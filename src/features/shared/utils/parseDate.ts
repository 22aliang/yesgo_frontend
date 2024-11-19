export const parseDate = (dateString: string | null): string => {
  if (!dateString) return 'Invalid Date';
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? 'Invalid Date'
    : date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
};

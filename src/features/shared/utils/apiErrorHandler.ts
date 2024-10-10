export const handleApiError = (
  error: unknown,
  showAlert?: (message: string, state: number) => void
): never => {
  console.log('API Error:', error);

  let errorMessage = '操作失敗，請稍後再試。'; // Default message

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as any;

    if (
      axiosError.response?.data?.errors &&
      axiosError.response.data.errors.length > 0
    ) {
      errorMessage = axiosError.response.data.errors[0]?.msg || errorMessage;
    } else if (axiosError.response?.data?.message) {
      errorMessage = axiosError.response.data.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (showAlert) {
    showAlert(errorMessage, 500); // 500 is a general server error
  }

  throw new Error(errorMessage);
};

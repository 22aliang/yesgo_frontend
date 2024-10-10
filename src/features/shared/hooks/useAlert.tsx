import { useState } from 'react';

export const useAlert = () => {
  const [alertData, setAlertData] = useState<{
    message: string;
    state: number;
    showModal: boolean;
  } | null>(null);

  const showAlert = (message: string, state: number) => {
    setAlertData({ message, state, showModal: true });
    setTimeout(() => {
      setAlertData(null);
    }, 1500);
  };

  return {
    alertData,
    showAlert,
  };
};

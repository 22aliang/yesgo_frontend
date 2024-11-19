import { ErrorDetail } from './errorDetailTypes';

export interface CustomError {
  response?: {
    data: {
      errors?: ErrorDetail[];
      message?: string;
    };
  };
}

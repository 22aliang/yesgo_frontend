import { AxiosResponse } from 'axios';
import { ErrorResponseData } from '../api/types/error/ErrorResponse';

export function handleResponse<T>(
  response: AxiosResponse<ErrorResponseData>
): T {
  if (response.data && 'data' in response.data) {
    return response.data.data as T;
  }
  throw new Error('Unexpected response format');
}

export function handlePaginatedResponse<T>(
  response: AxiosResponse<ErrorResponseData>
): T {
  if (response.data && 'data' in response.data) {
    return response.data as T;
  }
  throw new Error('Unexpected response format');
}

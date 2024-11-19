import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ValidationError } from './ValidationError';

export interface ErrorResponse extends AxiosResponse {
  data: ErrorResponseData;
}

export interface ErrorResponseData {
  message: string;
  errors: ValidationError[];
}

export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
  _retry?: boolean;
}

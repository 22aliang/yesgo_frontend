import axios, { AxiosError } from 'axios';

interface ValidationError {
  property: string;
  constraints: Record<string, string>;
}

interface ErrorResponse {
  message: string;
  errors: ValidationError[];
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9090',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupInterceptors = (logout: () => void) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const retryLimit = 2;
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (
        error.response &&
        error.response.status === 401 &&
        originalRequest._retryCount < retryLimit &&
        !originalRequest._retry
      ) {
        console.log('auth', originalRequest);
        if (originalRequest.url?.includes('/auth/login')) {
          if (error instanceof AxiosError) {
            console.log('axios error response:', error.response.data.message);
            if (error.response) {
              console.log('error response:', error.response.data.message);
              return Promise.reject(
                new Error(String(error.response.data.message) || 'Login failed')
              );
            } else {
              return Promise.reject(new Error('Unauthorized'));
            }
          }
        }

        originalRequest._retry = true;
        originalRequest._retryCount += 1;

        try {
          await api.post('/auth/refresh-token');
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      if (originalRequest._retryCount >= retryLimit) {
        logout();
      }

      console.log('str api ser');
      if (error.response) {
        console.log('str api response ser', error.response.data.message);
        console.log('str api response ser statue', error.response.status);
        switch (error.response.status) {
          case 400:
            if (
              error.response &&
              error.response.data &&
              error.response.data.errors
            ) {
              const errorData: ErrorResponse = error.response.data;
              const newErrors = errorData.errors
                .map((error) => {
                  const constraints = Object.values(error.constraints).join(
                    ', '
                  );
                  return `${constraints}`;
                })
                .join('\n');
              return Promise.reject(new Error(JSON.stringify(newErrors)));
            }
            if (
              error.response &&
              error.response.data &&
              error.response.data.message
            ) {
              return Promise.reject(
                new Error(String(error.response.data.message) || 'failed')
              );
            }
            return Promise.reject(
              new Error('Bad Request. Please check your input.')
            );
          case 401:
            return Promise.reject(
              new Error('Forbidden: You do not have permission.')
            );
          case 403:
            return Promise.reject(
              new Error('Forbidden: You do not have permission.')
            );
          case 404:
            return Promise.reject(
              new Error('Not Found: The resource could not be found.')
            );
          case 500:
            return Promise.reject(
              new Error('Internal Server Error. Please try again later.')
            );
          default:
            return Promise.reject(new Error('An unexpected error occurred.'));
        }
      }

      if (error.request) {
        return Promise.reject(
          new Error('Network Error. Please check your connection.')
        );
      }
      return Promise.reject(new Error('An unexpected error occurred.'));
    }
  );
};

export default api;

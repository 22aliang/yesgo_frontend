import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../types/UserData';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { userService } from '../services/userService';

interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: boolean;
  logout: void;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  login: false,
  logout: undefined,
};

export const register = createAsyncThunk(
  'auth/register',
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await authService.registerUser(
        username,
        email,
        password
      );
      const {
        token,
        avatar,
        username: registeredUsername,
        email: registeredEmail,
      } = response;

      localStorage.setItem('token', token);

      dispatch(
        setUser({
          username: registeredUsername,
          email: registeredEmail,
          avatar,
        })
      );
      toast.success('Register successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch }
  ) => {
    try {
      const response = await authService.loginUser(email, password);
      const { token, avatar, username, email: userEmail } = response;

      localStorage.setItem('token', token);

      dispatch(setUser({ username, email: userEmail, avatar }));
      toast.success('Login successfully!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authService.logoutUser();
    } finally {
      localStorage.removeItem('token');
      dispatch(clearUser());
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData: FormData, { dispatch }) => {
    try {
      const newData = await userService.updateUser(formData);
      console.log(newData);
      const { token, username, email, avatar } = newData;

      localStorage.setItem('token', token);

      dispatch(setUser({ username, email, avatar }));
      return { username, email, avatar };
    } catch (error) {
      toast.error('Failed to update user information.');
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

export const initializeAuth = () => async (dispatch) => {
  try {
    const userInfo = await authService.checkLoginStatus();
    dispatch(setUser(userInfo as UserData));
  } catch (error) {
    console.error('Failed to initialize auth:', error);
    dispatch(clearUser());
  }
};

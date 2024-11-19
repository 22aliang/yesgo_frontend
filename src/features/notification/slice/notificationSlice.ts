import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationService } from '@/features/notification/service/notificationService';

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const data = await notificationService.fetchNotification();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationService.handlerSetAllRead();
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, is_read: true }
          : notification
      );
      state.unreadCount = state.notifications.filter(
        (notification) => !notification.is_read
      ).length;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload as Notification[];
        state.notifications = data;
        state.unreadCount = data.filter(
          (notification: Notification) => !notification.is_read
        ).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          is_read: true,
        }));
        state.unreadCount = 0;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { markAsRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { messageService } from '@/features/message/service/messageService';
import { ChatMessage } from '../types/message.type';

interface MessageState {
  chatHistory: ChatMessage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: MessageState = {
  chatHistory: [],
  loading: false,
  error: null,
  hasMore: false,
};

export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (
    {
      friendId,
      conversationId,
      page,
    }: { friendId: number; conversationId: number | null; page: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await messageService.fetchMessage(
        friendId,
        conversationId,
        page
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (
    {
      friendId,
      message,
      conversationId,
    }: { friendId: number; message: string; conversationId: number | null },
    { rejectWithValue }
  ) => {
    try {
      const data = await messageService.sendMessage(
        friendId,
        message,
        conversationId
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetChatHistory: (state) => {
      state.chatHistory = [];
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.chatHistory.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        const payload = action.payload as { data: any[]; hasMore: boolean };
        state.chatHistory =
          action.meta.arg.page === 1
            ? payload.data
            : [...payload.data, ...state.chatHistory];
        state.hasMore = payload.hasMore;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        console.log('add finish', state.chatHistory);
      });
  },
});

export const { resetChatHistory, addMessage } = messageSlice.actions;

export default messageSlice.reducer;

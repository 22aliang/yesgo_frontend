import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { friendService } from '../service/friendService';
import { messageService } from '@/features/message/service/messageService';
import { userService } from '@/features/user/services/userService';
import { UserData } from '@/features/user/types/UserData';
import {
  AwaitingResponseList,
  Friend,
  FriendData,
  NeedToConfirmList,
  RejectedList,
} from '../types/friend.type';
import { ChatMessage } from '@/features/message/types/message.type';

interface FriendState {
  hasSearched: boolean;
  friends: Friend[];
  blockedFriends: Friend[];
  stagers: Friend[];
  selectedFriend: Friend | null;
  chatHistory: ChatMessage[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  isSendingMessage: boolean;
  overviewData: NeedToConfirmList[];
  awaitingList: AwaitingResponseList[];
  rejectedList: RejectedList[];
  searchResults: UserData | null;
}

const initialState: FriendState = {
  hasSearched: false,
  friends: [],
  blockedFriends: [],
  stagers: [],
  selectedFriend: null,
  chatHistory: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: false,
  isSendingMessage: false,
  overviewData: [],
  awaitingList: [],
  rejectedList: [],
  searchResults: null,
};

export const searchUser = createAsyncThunk(
  'friend/searchUser',
  async (username: string, { rejectWithValue }) => {
    try {
      const data = await userService.findByUserName(username);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFriend = createAsyncThunk(
  'friend/addFriend',
  async (friendId: number, { rejectWithValue }) => {
    try {
      await friendService.submitApply(friendId);
      return friendId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPendingFriends = createAsyncThunk(
  'friend/fetchPendingFriends',
  async (_, { rejectWithValue }) => {
    try {
      const data = await friendService.fetchPendingFriends();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitReject = createAsyncThunk(
  'friend/submitReject',
  async (id: number, { rejectWithValue }) => {
    try {
      await friendService.submitReject(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitAccept = createAsyncThunk(
  'friend/submitAccept',
  async (
    {
      request_id,
      conversation_id,
      id,
    }: { request_id: number; conversation_id: number; id: number },
    { rejectWithValue }
  ) => {
    try {
      await friendService.submitAccept(request_id, conversation_id, id);
      return { request_id, conversation_id, id };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOverview = createAsyncThunk(
  'friend/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const data = await friendService.fetchOverview();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'friend/fetchMessages',
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
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'friend/sendMessage',
  async (
    {
      friendId,
      message,
      conversationId,
    }: { friendId: number; message: string; conversationId: number | null },
    { rejectWithValue }
  ) => {
    try {
      const newMessage = await messageService.sendMessage(
        friendId,
        message,
        conversationId
      );
      return newMessage;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const blockFriend = createAsyncThunk(
  'friend/blockFriend',
  async (friendId: number, { rejectWithValue }) => {
    try {
      await friendService.submitBlock(friendId);
      return friendId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitBlock = createAsyncThunk(
  'friend/submitBlock',
  async (friendId: number, { rejectWithValue }) => {
    try {
      const data = await friendService.submitBlock(friendId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitUnblock = createAsyncThunk(
  'friend/submitUnblock',
  async (friendId: number, { rejectWithValue }) => {
    try {
      const data = await friendService.submitUnblock(friendId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setSelectedFriend: (state, action: PayloadAction<Friend | null>) => {
      state.selectedFriend = action.payload;
      state.chatHistory = [];
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setIsSendingMessage: (state, action: PayloadAction<boolean>) => {
      state.isSendingMessage = action.payload;
    },
    resetSearch: (state) => {
      state.searchResults = null;
      state.hasSearched = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload as UserData;
        console.log(state.searchResults);
        state.hasSearched = true;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasSearched = true;
      })
      .addCase(addFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.loading = false;
        state.searchResults = null;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPendingFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingFriends.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload as FriendData;
        state.overviewData = data.needToConfirmList || [];
        state.awaitingList = data.awaitingResponseList || [];
        state.rejectedList = data.rejectedList || [];
      })
      .addCase(fetchPendingFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitReject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReject.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewData = state.overviewData.filter(
          (request) => request.id !== action.payload
        );
      })
      .addCase(submitReject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitAccept.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAccept.fulfilled, (state, action) => {
        state.loading = false;
        state.overviewData = state.overviewData.filter(
          (request) => request.id !== action.payload.id
        );
      })
      .addCase(submitAccept.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload.friends;
        state.blockedFriends = action.payload.blocks;
        state.stagers = action.payload.stagerData;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = [
          ...(action.payload as ChatMessage[]),
          ...state.chatHistory,
        ];
        const messages = action.payload as ChatMessage[];
        if (messages.length === 10 && state.page === 1) {
          state.hasMore = true;
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isSendingMessage = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSendingMessage = false;
        state.chatHistory = [
          ...state.chatHistory,
          action.payload as ChatMessage,
        ];
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.error = action.payload as string;
      })
      .addCase(submitBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBlock.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitUnblock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitUnblock.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitUnblock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedFriend, setPage, setIsSendingMessage, resetSearch } =
  friendSlice.actions;
export default friendSlice.reducer;

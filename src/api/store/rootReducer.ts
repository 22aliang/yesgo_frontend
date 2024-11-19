import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/user/slice/authSlice';
import proposalReducer from '@/features/proposal/slice/proposalSlice';
import notificationReducer from '@/features/notification/slice/notificationSlice';
import friendReducer from '@/features/friend/slice/friendSlice';
import messageReducer from '@/features/message/slice/messageSlice';
import ratingReducer from '@/features/proposal/slice/ratingSlice';
import popularReducer from '@/features/proposal/slice/popularSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  proposal: proposalReducer,
  notification: notificationReducer,
  friend: friendReducer,
  message: messageReducer,
  rating: ratingReducer,
  popular: popularReducer,
});

export default rootReducer;

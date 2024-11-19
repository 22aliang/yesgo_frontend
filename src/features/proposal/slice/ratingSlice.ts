import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { proposalService } from '@/features/proposal/services/proposalsService';

interface RatingState {
  ratings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RatingState = {
  ratings: [],
  loading: false,
  error: null,
};

export const fetchProposalRatings = createAsyncThunk(
  'rating/fetchProposalRatings',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const data = await proposalService.fetchProposalRatings(proposalId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitRating = createAsyncThunk(
  'rating/submitRating',
  async (
    { proposalId, rating }: { proposalId: number; rating: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await proposalService.submitRating(proposalId, rating);
      return data;
      console.log(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProposalRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchProposalRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings.push(action.payload);
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ratingSlice.reducer;

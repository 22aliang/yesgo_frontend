import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { popularService } from '../services/popularService';

interface Proposal {
  id: number;
  title: string;
  img_url: string;
  avg_rating: number;
  author: string;
  popularityScore: number;
}

interface PopularState {
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
}

const initialState: PopularState = {
  proposals: [],
  loading: false,
  error: null,
};

export const fetchPopularProposals = createAsyncThunk(
  'popular/fetchPopularProposals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await popularService.getPopularData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchPopularProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default popularSlice.reducer;

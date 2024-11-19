import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { proposalService } from '../services/proposalsService';
import { tagService } from '@/features/tag/tagServices';
import { locationService } from '@/features/location/locationServices';

interface ProposalState {
  proposals: any[];
  owner: any[];
  draft: any[];
  saveData: any[];
  availableTags: any[];
  availableLocations: any[];
  loading: boolean;
  error: string | null;
  currentProposal: any | null;
  comments: any[];
  ratings: any[];
  participants: any[];
  currentPage: number;
}

const initialState: ProposalState = {
  proposals: [],
  saveData: [],
  owner: [],
  draft: [],
  availableTags: [],
  availableLocations: [],
  loading: false,
  error: null,
  currentProposal: null,
  comments: [],
  ratings: [],
  participants: [],
  currentPage: 1,
};

export const submitProposal = createAsyncThunk(
  'proposal/submitProposal',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const data = await proposalService.submitProposal(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProposal = createAsyncThunk(
  'proposal/updateProposal',
  async (
    { proposal_id, formData }: { proposal_id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const data = await proposalService.updateProposal(proposal_id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitSaved = createAsyncThunk(
  'proposal/submitSaved',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const data = await proposalService.submitSaved(proposalId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSavedProposals = createAsyncThunk(
  'proposal/fetchSavedProposals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await proposalService.fetchSavedProposals({
        page: '1',
        sort: '熱門',
        tags: '',
        time: '',
        rating: '',
        keyword: '',
        type: '1',
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOwnerProposals = createAsyncThunk(
  'proposal/fetchOwnerProposals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await proposalService.fetchOwnerProposals({
        page: '1',
        tags: '',
        rating: '',
        keyword: '',
        type: '0',
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDraftProposals = createAsyncThunk(
  'proposal/fetchDraftProposals',
  async (_, { rejectWithValue }) => {
    try {
      const data = await proposalService.fetchOwnerProposals({
        page: '1',
        tags: '',
        rating: '',
        keyword: '',
        type: '1',
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProposals = createAsyncThunk(
  'proposal/fetchProposals',
  async (queryParams: any, { rejectWithValue }) => {
    try {
      const response = await proposalService.fetchProposals(queryParams);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTags = createAsyncThunk(
  'proposal/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tagService.fetchOverview();
      return response.map((tag: any) => ({
        value: tag.id,
        label: tag.name,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLocations = createAsyncThunk(
  'proposal/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await locationService.fetchOverview();
      return response.map((location: any) => ({
        value: location.id,
        label: location.name,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProposalDetail = createAsyncThunk(
  'proposal/fetchProposalDetail',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const response = await proposalService.fetchProposalDetail(proposalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProposalComments = createAsyncThunk(
  'proposal/fetchProposalComments',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const response = await proposalService.fetchProposalComments(proposalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProposalRatings = createAsyncThunk(
  'proposal/fetchProposalRatings',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const response = await proposalService.fetchProposalRatings(proposalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchParticipants = createAsyncThunk(
  'proposal/fetchParticipants',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const response = await proposalService.fetchParticipants(proposalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const participateInProposal = createAsyncThunk(
  'proposal/participateInProposal',
  async (proposalId: number, { rejectWithValue }) => {
    try {
      const response = await proposalService.participateInProposal(proposalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.saveData = action.payload;
      })
      .addCase(fetchSavedProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOwnerProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnerProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
      })
      .addCase(fetchOwnerProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDraftProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDraftProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.draft = action.payload;
      })
      .addCase(fetchDraftProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProposals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposals.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.availableTags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.availableLocations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProposalDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProposal = action.payload;
      })
      .addCase(fetchProposalDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProposalComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchProposalComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
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
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(participateInProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(participateInProposal.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProposal) {
          state.currentProposal.participationStatus = 'pending';
        }
      })
      .addCase(participateInProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitSaved.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSaved.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProposal) {
          state.currentProposal.isSaved = true;
        }
      })
      .addCase(submitSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals.push(action.payload);
      })
      .addCase(submitProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProposal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.proposals.findIndex(
          (proposal) => proposal.id === action.payload.id
        );
        if (index !== -1) {
          state.proposals[index] = action.payload;
        }
      })
      .addCase(updateProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage } = proposalSlice.actions;
export default proposalSlice.reducer;

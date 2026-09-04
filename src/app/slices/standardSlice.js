import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { standardApi } from '../../api/standardApi';

// GET /api/standard/search?q=...
// Controller: searchStandard in standardController.js
// Response: { success: true, query, count, standards: [...] }
export const searchStandards = createAsyncThunk(
  'standards/searchStandards',
  async (query, { rejectWithValue }) => {
    try {
      const res = await standardApi.searchStandards(query);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to search standards');
    }
  }
);

// GET /api/standard/:id/version
// Controller: getStandardVersionController in standardController.js
export const fetchStandardVersion = createAsyncThunk(
  'standards/fetchStandardVersion',
  async (id, { rejectWithValue }) => {
    try {
      const res = await standardApi.getStandardVersion(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch standard version');
    }
  }
);

// GET /api/standard/:id/graph?depth=1
// Controller: getStandardGraphController in standardController.js
// Response: { success: true, standard, depth, graph: { nodes, edges } }
export const fetchStandardGraph = createAsyncThunk(
  'standards/fetchStandardGraph',
  async ({ id, depth = 1 }, { rejectWithValue }) => {
    try {
      const res = await standardApi.getStandardGraph(id, depth);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch standard graph');
    }
  }
);

// POST /api/standard
// Controller: createStandard in standardController.js
export const createNewStandard = createAsyncThunk(
  'standards/createNewStandard',
  async (data, { rejectWithValue }) => {
    try {
      const res = await standardApi.createStandard(data);
      return res.standard;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create standard');
    }
  }
);

const standardSlice = createSlice({
  name: 'standards',
  initialState: {
    searchQuery: '',
    standards: [],
    searchCount: 0,
    activeStandard: null,
    standardVersion: null,
    standardGraph: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveStandard: (state, action) => {
      state.activeStandard = action.payload;
    },
    clearStandardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search
      .addCase(searchStandards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStandards.fulfilled, (state, action) => {
        state.loading = false;
        state.standards = action.payload.standards || [];
        state.searchCount = action.payload.count || 0;
        state.searchQuery = action.payload.query || '';
      })
      .addCase(searchStandards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Version
      .addCase(fetchStandardVersion.fulfilled, (state, action) => {
        state.standardVersion = action.payload;
      })
      // Graph
      .addCase(fetchStandardGraph.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStandardGraph.fulfilled, (state, action) => {
        state.loading = false;
        state.standardGraph = action.payload;
      })
      .addCase(fetchStandardGraph.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setActiveStandard, clearStandardError } = standardSlice.actions;
export default standardSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { getTokenCookie, getUserCookie, removeTokenCookie } from '../../utils/cookieUtils';

export const loginOfficer = createAsyncThunk(
  'auth/loginOfficer',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerAgency = createAsyncThunk(
  'auth/registerAgency',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMe();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Session verification failed');
    }
  }
);

export const fetchCurrentUser = fetchProfile;

const initialToken = getTokenCookie();
const initialUser = getUserCookie();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
    },
    logoutUser: (state) => {
      authApi.logout();
      removeTokenCookie();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginOfficer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginOfficer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginOfficer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAgency.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerAgency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchProfile.rejected, (state) => {
        // If token failed verification in backend auth middleware
        removeTokenCookie();
        removeUserCookie();
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

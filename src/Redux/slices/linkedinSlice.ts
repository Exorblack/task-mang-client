// src/Redux/slices/linkedinSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LinkedInProfile {
  name: string;
  profileUrl: string;
  photoUrl: string;
  email: string;
}

interface LinkedInState {
  profile: LinkedInProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: LinkedInState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchLinkedinProfile = createAsyncThunk('linkedin/fetchProfile', async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch('http://localhost:8080/linkedin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
});

const linkedinSlice = createSlice({
  name: 'linkedin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinkedinProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinkedinProfile.fulfilled, (state, action: PayloadAction<LinkedInProfile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchLinkedinProfile.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch profile';
        state.loading = false;
      });
  },
});

export default linkedinSlice.reducer;

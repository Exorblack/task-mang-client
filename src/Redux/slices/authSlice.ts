import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { RootState } from '../store';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
};

// Thunk for checking authentication
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await fetch('http://localhost:8080/auth/check', {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Not authenticated');
  }
  return response.json();
});

// Thunk for login
export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Invalid email or password');
  }
  return response.json();
});

// Thunk for register
export const register = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
});

// Thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await fetch('http://localhost:8080/auth/logout', {
    method: 'POST',
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Failed to logout');
  }
});

export const Linkedin = createAsyncThunk('linkedin', async () => {
  const response = await fetch('http://localhost:8080/linkedin', {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Failed to Get user');
  }

});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, () => {
        toast.error('Invalid email or password');
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, () => {
        toast.error('Registration failed');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, () => {
        toast.error('Failed to logout');
      })
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketsApiUrl = 'https://api.spacexdata.com/v4/rockets';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(rocketsApiUrl);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch rockets');
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  rockets: [],
  statusFetch: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  statusAdd: 'idle',
  statusRemove: 'idle',
  error: null,
};

const rocketSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.statusFetch = 'idle';
      state.statusAdd = 'idle';
      state.statusRemove = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.statusFetch = 'succeeded';
        state.rockets = action.payload;
      });
  },
});

export const { resetStatus } = rocketSlice.actions;
export default rocketSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketsApiUrl = 'https://api.spacexdata.com/v4/rockets';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async (_, { getState, rejectWithValue }) => {
  const { rockets: rocketsState } = getState();
  if (rocketsState.statusFetch === 'succeeded') {
    return rocketsState.rockets;
  }
  try {
    const response = await axios.get(rocketsApiUrl);
    if (response.status === 200) {
      const responseData = response.data.map((rocket) => ({
        ...rocket,
        reserve: false,
      }));
      return responseData;
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
  hasFetched: false,
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
    toggleReserve: (state, action) => {
      const targetId = action.payload;
      state.rockets = state.rockets.map((rocket) => {
        if (rocket.id === targetId) {
          return {
            ...rocket,
            reserve: !rocket.reserve,
          };
        }
        return rocket;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.statusFetch = 'succeeded';
        if (!state.hasFetched) {
          state.rockets = action.payload;
        }
        state.hasFetched = true;
      });
  },
});

export const { resetStatus, toggleReserve } = rocketSlice.actions;
export default rocketSlice.reducer;

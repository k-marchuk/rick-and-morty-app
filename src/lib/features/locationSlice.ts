import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getLocations } from '@/app/api/location';
import { LocationResponse, Location, Info } from '@/app/types/Location';

type LocationState = {
  results: Location[];
  info: Info;
  loading: boolean;
  error: string;
};

const initialState: LocationState = {
  results: [],
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
    query: '',
  },
  loading: false,
  error: '',
};

export const fetchLocations = createAsyncThunk<LocationResponse, string>(
  'locations/fetch',
  (params) => getLocations(params)
);

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          info: {
            ...action.payload.info,
            query: action.meta.arg,
          },
          loading: false,
        };
      })
      .addCase(fetchLocations.rejected, (state) => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default locationSlice.reducer;

const locations = (state: RootState) => state[locationSlice.name];

export const locationsSelector = createSelector(
  [locations],

  (value) => {
    return value.results;
  }
);

export const locationsLoadingSelector = createSelector(
  [locations],
  (value) => value.loading
);

export const locationsErrorSelector = createSelector(
  [locations],
  (value) => value.error
);

export const locationsInfoSelector = createSelector(
  [locations],
  (value) => value.info
);

export const { actions } = locationSlice;

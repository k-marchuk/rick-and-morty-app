import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getEpisodes } from '../../app/api/episode';
import { RootState } from '../store';
import { Episode, EpisodeResponse, Info } from '@/app/types/Episode';

type EpisodesState = {
  results: Episode[];
  info: Info;
  loading: boolean;
  error: string;
};

const initialState: EpisodesState = {
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

export const fetchEpisodes = createAsyncThunk<EpisodeResponse, string>(
  'episodes/fetch',
  (params) => getEpisodes(params)
);

export const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
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
      .addCase(fetchEpisodes.rejected, (state) => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default episodesSlice.reducer;

const episodes = (state: RootState) => state[episodesSlice.name];

export const episodesSelector = createSelector(
  [episodes],
  (value) => value.results
);

export const episodesLoadingSelector = createSelector(
  [episodes],
  (value) => value.loading
);

export const episodesErrorSelector = createSelector(
  [episodes],
  (value) => value.error
);

export const episodesInfoSelector = createSelector(
  [episodes],
  (value) => value.info
);

export const { actions } = episodesSlice;

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { Character, CharactersResponse, Info } from '../../app/types/Character';
import { getCharacters } from '../../app/api/characters';
import { RootState } from '../store';

type CharactersState = {
  results: Character[];
  info: Info;
  loading: boolean;
  error: string;
};

const initialState: CharactersState = {
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

export const fetchCharacters = createAsyncThunk<CharactersResponse, string>(
  'characters/fetch',
  (params) => getCharacters(params)
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          info: { ...action.payload.info, query: action.meta.arg },
          loading: false,
          error: action.payload.error || '',
        };
      })
      .addCase(fetchCharacters.rejected, (state) => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default charactersSlice.reducer;

const characters = (state: RootState) => state[charactersSlice.name];

export const charactersSelector = createSelector(
  [characters],
  (value) => value.results
);

export const charactersLoadingSelector = createSelector(
  [characters],
  (value) => value.loading
);

export const charactersErrorSelector = createSelector(
  [characters],
  (value) => value.error
);

export const charactersInfoSelector = createSelector(
  [characters],
  (value) => value.info
);

export const { actions } = charactersSlice;

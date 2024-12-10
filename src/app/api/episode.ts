import { client } from '../services/fetchClient';
import { Episode, EpisodeResponse } from '../types/Episode';

export const getEpisodes = (params: string) => {
  return client.get<EpisodeResponse>(`/episode?${params}`);
};

export const getMultipleEpisodes = (ids: string) => {
  return client.get<Episode[]>(`/episode?[${ids}]`);
};

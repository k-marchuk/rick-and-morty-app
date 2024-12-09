import { client } from '../services/fetchClient';
import { EpisodeResponse } from '../types/Episode';

export const getEpisodes = (params: string) => {
  return client.get<EpisodeResponse>(`/episode?${params}`);
};

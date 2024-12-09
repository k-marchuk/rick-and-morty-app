import { client } from '../services/fetchClient';
import { LocationResponse } from '../types/Location';

export const getLocations = (params: string) => {
  return client.get<LocationResponse>(`/location?${params}`);
};

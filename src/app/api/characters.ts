import { client } from '../services/fetchClient';
import { Character, CharactersResponse } from '../types/Character';

export const getCharacters = (params: string) => {
  return client.get<CharactersResponse>(`/character/?${params}`);
};

export const getMultipleCharacters = (ids: string) => {
  return client.get<Character[]>(`/character/[${ids}]`);
};

export const getCharacter = (id: number) => {
  return client.get<Character>(`/character/${id}`);
};

const BASE_URL = 'https://rickandmortyapi.com/api';

function request<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then((response) => response.json());
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

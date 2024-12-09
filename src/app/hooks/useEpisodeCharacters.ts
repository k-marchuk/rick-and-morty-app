import { useCallback, useState } from 'react';
import { getMultipleCharacters } from '../api/characters';
import { Character } from '../types/Character';
import { Episode } from '../types/Episode';

const useEpisodeCharacters = () => {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCharacters = useCallback((episode: Episode) => {
    const ids = episode.characters
      .map((url: string) => Number(url.split('/')[5]))
      .join();

    setIsLoading(true);

    getMultipleCharacters(ids)
      .then(setData)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [data, error, isLoading, fetchCharacters] as const;
};

export default useEpisodeCharacters;

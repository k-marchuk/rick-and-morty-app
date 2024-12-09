import { useCallback, useState } from 'react';
import { getMultipleCharacters } from '../api/characters';
import { Character } from '../types/Character';
import { Location } from '../types/Location';

const useLocationResidents = () => {
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchResidents = useCallback((location: Location) => {
    const ids = location.residents
      .map((url: string) => Number(url.split('/')[5]))
      .join();

    setIsLoading(true);

    getMultipleCharacters(ids)
      .then(setData)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [data, error, isLoading, fetchResidents] as const;
};

export default useLocationResidents;

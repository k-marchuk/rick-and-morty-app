'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Gender, Status } from '../types/Character';
import debounce from 'lodash/debounce';

type HTMLElement = HTMLSelectElement | HTMLInputElement;

export const CharacterFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gender = searchParams.get('gender') || '';
  const status = searchParams.get('status') || '';
  const name = searchParams.get('name') || '';
  const species = searchParams.get('species') || '';

  const [queryName, setQueryName] = useState(name);
  const [querySpecies, setQuerySpecies] = useState(species);
  const [queryGender, setQueryGender] = useState(gender);
  const [queryStatus, setQueryStatus] = useState(status);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      params.set('page', '1');

      return params.toString();
    },
    [searchParams]
  );

  const debouncedPush = useMemo(
    () =>
      debounce((query: string, value: string) => {
        console.log({ debounsedPush: 'debaunce ' });

        router.push(pathname + '?' + createQueryString(query, value));
      }, 500),
    [createQueryString, pathname, router]
  );

  function handleFilterChange(
    query: string,
    event: React.FormEvent<HTMLElement>
  ) {
    const value = (event.target as HTMLFormElement).value;

    if (query === 'name') {
      setQueryName(value);
    }
    if (query === 'species') {
      setQuerySpecies(value);
    }

    if (query === 'status') {
      setQueryStatus(value);
    }
    if (query === 'gender') {
      setQueryGender(value);
    }

    debouncedPush(query, value);
  }

  function resetAllFilters() {
    setQueryGender('');
    setQueryName('');
    setQuerySpecies('');
    setQueryStatus('');
    router.push(pathname + '');
  }

  if (!searchParams.toString) {
    setQueryGender('');
    setQueryName('');
    setQuerySpecies('');
    setQueryStatus('');
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={queryName}
          onChange={(event) => handleFilterChange('name', event)}
          placeholder="Type a name..."
          className="input input-bordered w-full input-primary max-w-xs"
        />
      </div>
      <select
        className="select select-primary w-full max-w-xs"
        value={queryStatus}
        onChange={(event) => handleFilterChange('status', event)}
      >
        <option hidden>Choose a status...</option>
        <option>{Status.Alive}</option>
        <option>{Status.Dead}</option>
        <option>{Status.Unknown}</option>
      </select>

      <select
        className="select select-primary w-full max-w-xs"
        value={queryGender}
        onChange={(event) => handleFilterChange('gender', event)}
      >
        <option hidden>Choose a gender...</option>
        <option>{Gender.Male}</option>
        <option>{Gender.Female}</option>
        <option>{Gender.Genderless}</option>
        <option>{Gender.Unknown}</option>
      </select>

      <div>
        <input
          type="text"
          value={querySpecies}
          onChange={(event) => handleFilterChange('species', event)}
          placeholder="Type a species..."
          className="input input-bordered w-full input-primary max-w-xs"
        />
      </div>
      <button className="btn btn-wide bg-pink-200" onClick={resetAllFilters}>
        Reset all filters
      </button>
    </>
  );
};

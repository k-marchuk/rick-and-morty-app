'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Gender, Status } from '../types/Character';
import debounce from 'lodash/debounce';
import { zodResolver } from '@hookform/resolvers/zod';

type FilterName = 'name' | 'species' | 'gender' | 'status';

const schema = z.object({
  name: z.string().optional(),
  species: z.string().optional(),
  gender: z
    .enum([Gender.Male, Gender.Female, Gender.Genderless, Gender.Unknown])
    .optional(),
  status: z.enum([Status.Alive, Status.Dead, Status.Unknown]).optional(),
});

type FormData = z.infer<typeof schema>;

export const CharacterFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const gender = (searchParams.get('gender') as Gender) || '';
  const status = (searchParams.get('status') as Status) || '';
  const name = searchParams.get('name') || '';
  const species = searchParams.get('species') || '';

  const { control, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      species,
      gender,
      status,
    },
  });

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
        router.push(pathname + '?' + createQueryString(query, value));
      }, 500),
    [createQueryString, pathname, router]
  );

  useEffect(() => {
    if (!searchParams.toString()) {
      reset({
        name: '',
        species: '',
        gender: undefined,
        status: undefined,
      });
    }
  }, [searchParams, reset]);

  const handleInputChange = (name: FilterName, value: string) => {
    setValue(name, value);
    debouncedPush(name, value);
  };

  function resetAllFilters() {
    reset({
      name: '',
      species: '',
      gender: undefined,
      status: undefined,
    });
    router.push(pathname + '');
  }

  return (
    <>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Type a name..."
              className="input input-bordered w-full input-primary max-w-xs"
              onChange={(event) =>
                handleInputChange('name', event.target.value)
              }
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="select select-primary w-full max-w-xs"
              onChange={(event) =>
                handleInputChange('status', event.target.value)
              }
            >
              <option hidden>Choose a status...</option>
              <option>{Status.Alive}</option>
              <option>{Status.Dead}</option>
              <option>{Status.Unknown}</option>
            </select>
          )}
        />
      </div>

      <div>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="select select-primary w-full max-w-xs"
              onChange={(event) =>
                handleInputChange('gender', event.target.value)
              }
            >
              <option hidden>Choose a gender...</option>
              <option>{Gender.Male}</option>
              <option>{Gender.Female}</option>
              <option>{Gender.Genderless}</option>
              <option>{Gender.Unknown}</option>
            </select>
          )}
        />
      </div>

      <div>
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              {...field}
              placeholder="Type a species..."
              className="input input-bordered w-full input-primary max-w-xs"
              onChange={(event) =>
                handleInputChange('species', event.target.value)
              }
            />
          )}
        />
      </div>

      <button
        type="button"
        className="btn btn-wide bg-pink-200"
        onClick={resetAllFilters}
      >
        Reset all filters
      </button>
    </>
  );
};

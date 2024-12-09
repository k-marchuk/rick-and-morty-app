'use client';

import { useAppDispatch, useAppSelector } from '../lib/hooks';
import {
  charactersErrorSelector,
  charactersInfoSelector,
  charactersLoadingSelector,
  charactersSelector,
  fetchCharacters,
} from '../lib/features/charactersSlice';
import { useEffect } from 'react';
import Pagination from 'rc-pagination';
import { CharacterCard } from './components/CharacterCard';
import { CharacterFilter } from './components/CharacterFilter';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
// import Loading from './loading';
import Image from 'next/image';
import image from '../app/api/pickle.png';
import { Character } from './types/Character';

export default function Page({
  searchParams,
}: {
  searchParams: {
    page: string | undefined;
    name: string | undefined;
    species: string | undefined;
    gender: string | undefined;
    status: string | undefined;
  };
}) {
  const page = Number(searchParams.page || 1);
  const gender = searchParams.gender || '';
  const status = searchParams.status || '';
  const name = searchParams.name || '';
  const species = searchParams.species || '';

  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const dispatch = useAppDispatch();
  const characters = useAppSelector(charactersSelector);
  const loading = useAppSelector(charactersLoadingSelector);
  const error = useAppSelector(charactersErrorSelector);
  const { count, query } = useAppSelector(charactersInfoSelector);

  function handlePaginationChange(currentPage: number) {
    const updatedParams = new URLSearchParams(searchParameters.toString());
    updatedParams.set('page', currentPage.toString());
    router.push(pathname + '?' + updatedParams.toString());

    const params = new URLSearchParams({
      page: currentPage.toString(),
      status: status,
      gender: gender,
      name: name,
      species: species,
    });

    dispatch(fetchCharacters(params.toString()));
  }

  useEffect(() => {
    const params = new URLSearchParams({
      page: page.toString(),
      status: status,
      gender: gender,
      name: name,
      species: species,
    });

    if (!characters.length || query !== params.toString()) {
      dispatch(fetchCharacters(params.toString()));
    }
  }, [characters, page, query, status, gender, name, species, dispatch]);

  return (
    <>
      <div className="container flex flex-col mx-auto py-20 items-center">
        <div className="flex md:flex-row min-w-full flex-col items-center md:items-start gap-10">
          <details className="dropdown md:hidden">
            <summary className="btn btn-wide bg-pink-200">
              Filters options
            </summary>
            <div className="flex flex-col gap-4 mt-4">
              <CharacterFilter />
            </div>
          </details>

          <div className="hidden md:flex flex-col gap-4 mt-4">
            <CharacterFilter />
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center gap-6 p-8">
              <Image src={image} alt="Character" width={256} height={256} />
              <div className="text-xl md:text-2xl text-gray-600 text-center">
                <p className="mb-4 font-semibold">
                  Well, this is a catastrophe.
                </p>
                <p className="text-gray-400">
                  No results. I guess the multiverse just doesn’t care.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-12">
              {characters.map((character: Character) => (
                <CharacterCard character={character} key={character.id} />
              ))}
            </div>
          )}
          {/* {loading ? (
            <Loading />
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-6 p-8">
              <Image src={image} alt="Character" width={256} height={256} />
              <div className="text-xl md:text-2xl text-gray-600 text-center">
                <p className="mb-4 font-semibold">
                  Well, this is a catastrophe.
                </p>
                <p className="text-gray-400">
                  No results. I guess the multiverse just doesn’t care.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-12">
              {characters.map((character) => (
                <CharacterCard character={character} key={character.id} />
              ))}
            </div>
          )} */}
        </div>

        {!error && !loading && (
          <Pagination
            className="ant-pagination"
            current={page}
            total={count}
            pageSize={20}
            onChange={handlePaginationChange}
          />
        )}
      </div>
    </>
  );
}

'use client';

import {
  episodesInfoSelector,
  episodesSelector,
  fetchEpisodes,
} from '@/lib/features/episodesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import { Episode } from '../types/Episode';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { CharactersModal } from '../components/EpisodeModal';
import { motion } from 'framer-motion';

export default function Page({
  searchParams,
}: {
  searchParams: {
    page: string | undefined;
  };
}) {
  const page = Number(searchParams.page || 1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const dispatch = useAppDispatch();
  const episodes = useAppSelector(episodesSelector);
  const { count, query } = useAppSelector(episodesInfoSelector);
  const [episode, setEpisode] = useState<Episode | null>(null);

  function handlePaginationChange(currentPage: number) {
    const updatedParams = new URLSearchParams(searchParameters.toString());
    updatedParams.set('page', currentPage.toString());
    router.push(pathname + '?' + updatedParams.toString());

    const params = new URLSearchParams({
      page: currentPage.toString(),
    });

    fetchEpisodes(params.toString());
  }

  useEffect(() => {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    if (!episodes.length || query !== params.toString()) {
      dispatch(fetchEpisodes(params.toString()));
    }
  }, [dispatch, episodes, page, query]);

  return (
    <>
      <div className="container flex flex-col ps-8 pe-8 mx-auto py-20 items-center">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Episode List</h1>
          </div>
        </div>
        <div className="overflow-x-auto w-full mb-10">
          <table className="min-w-full table-auto md:table">
            <thead>
              <tr>
                <th className="text-center text-gray-400 px-4 py-2">Name</th>
                <th className="text-center text-gray-400 px-4 py-2">Episode</th>
                <th className="text-center text-gray-400 px-4 py-2">
                  Air Date
                </th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr key={episode.id} className="text-xl">
                  <td>
                    <div className="flex items-center gap-3 ">
                      <div>
                        <div className="font-bold text-base md:text-2xl">
                          {episode.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-base md:text-2xl">
                    {episode.episode}
                    <br />
                  </td>
                  <td className="px-4 py-2 text-base md:text-2xl">
                    {episode.air_date}
                  </td>
                  <th>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <button
                        className="btn btn-ghost bg-pink-200 btn-sm md:btn-lg text-xs "
                        onClick={() => {
                          setEpisode(episode);
                        }}
                      >
                        See characters
                      </button>
                    </motion.div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {episode && (
            <CharactersModal
              episode={episode}
              onClose={() => setEpisode(null)}
            />
          )}
        </div>
        <Pagination
          className="ant-pagination"
          current={page}
          total={count}
          pageSize={20}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
}

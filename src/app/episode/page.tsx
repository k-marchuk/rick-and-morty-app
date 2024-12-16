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
import { CharactersModal } from '../components/EpisodeModal';
import { usePaginationChange } from './../hooks/usePaginationChange';
import { motion } from 'framer-motion';

export default function Page({
  searchParams,
}: {
  searchParams: {
    page: string | undefined;
  };
}) {
  const page = Number(searchParams.page || 1);

  const dispatch = useAppDispatch();
  const episodes = useAppSelector(episodesSelector);
  const { handlePaginationChange } = usePaginationChange();

  const { count, query } = useAppSelector(episodesInfoSelector);
  const [episode, setEpisode] = useState<Episode | null>(null);

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
          <table className="min-w-full table-auto md:table border-separate border-spacing-y-4 md:border-spacing-y-1">
            <thead>
              <tr>
                <th className="text-center text-gray-400 px-4 py-2">Name</th>
                <th className="hidden md:table-cell text-center text-gray-400 px-4 py-2">
                  Episode
                </th>
                <th className="hidden md:table-cell text-center text-gray-400 px-4 py-2">
                  Air Date
                </th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <motion.tr
                  key={episode.id}
                  className="text-xl opacity-0 m-4"
                  animate={{ opacity: 1, transition: { duration: 1 } }}
                  whileHover={{
                    scale: 1,
                    boxShadow: '5px 10px 5px rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <td>
                    <div className="flex items-center gap-3 ">
                      <div>
                        <div className="font-bold text-xl md:text-2xl">
                          {episode.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 py-2 text-base md:text-2xl">
                    {episode.episode}
                    <br />
                  </td>
                  <td className="hidden md:table-cell px-4 py-2 text-base md:text-2xl">
                    {episode.air_date}
                  </td>
                  <th>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <button
                        className="btn btn-ghost bg-pink-200 btn-sm md:btn-lg text-md"
                        onClick={() => {
                          setEpisode(episode);
                        }}
                      >
                        See characters
                      </button>
                    </motion.div>
                  </th>
                </motion.tr>
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

'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Pagination from 'rc-pagination';
import { useEffect, useState } from 'react';
import { Location } from '../types/Location';
import { usePaginationChange } from './../hooks/usePaginationChange';
import {
  fetchLocations,
  locationsInfoSelector,
  locationsSelector,
} from '@/lib/features/locationSlice';
import { LocationModal } from '../components/LocationModal';
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
  const locations = useAppSelector(locationsSelector);
  const { count, query } = useAppSelector(locationsInfoSelector);
  const [location, setLocation] = useState<Location | null>(null);
  const { handlePaginationChange } = usePaginationChange();

  useEffect(() => {
    const params = new URLSearchParams({
      page: page.toString(),
    });
    if (!locations.length || query !== params.toString()) {
      dispatch(fetchLocations(params.toString()));
    }
  }, [dispatch, locations, page, query]);

  return (
    <>
      <div className="container flex flex-col ps-8 pe-8 mx-auto py-20 items-center">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Locations List</h1>
          </div>
        </div>
        <div className="overflow-x-auto w-full mb-10">
          <table className="min-w-full table-auto md:table">
            <thead>
              <tr>
                <th className="text-center px-4 py-2">Location</th>
                <th className="text-center px-4 py-2">Dimension</th>
                <th className="text-center px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location: Location) => (
                <motion.tr
                  key={location.id}
                  className="text-xl opacity-0"
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
                        <div className="font-bold text-base md:text-2xl">
                          {location.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-base md:text-2xl">
                    {location.dimension}
                    <br />
                  </td>
                  <td className="px-4 py-2 text-base md:text-2xl">
                    {location.type}
                  </td>
                  <th>
                    {location.residents.length ? (
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <button
                          className="btn btn-ghost btn-wide bg-pink-200 btn-sm md:btn-lg text-xs "
                          onClick={() => {
                            setLocation(location);
                          }}
                        >
                          See residents
                        </button>
                      </motion.div>
                    ) : (
                      <button className="btn btn-ghost btn-wide pointer-events-none bg-blue-100 btn-sm md:btn-lg text-xs">
                        Nobody lives here.
                      </button>
                    )}
                  </th>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {location && (
            <LocationModal
              location={location}
              onClose={() => setLocation(null)}
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

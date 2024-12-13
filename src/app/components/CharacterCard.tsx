import { useAppSelector } from '@/lib/hooks';
import { Character } from '../types/Character';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { charactersLoadingSelector } from '@/lib/features/charactersSlice';
import { motion } from 'framer-motion';

type Props = {
  character: Character;
};

export const CharacterCard: React.FC<Props> = ({ character }) => {
  const loading = useAppSelector(charactersLoadingSelector);

  return (
    <>
      <motion.div
        className="card bg-base-100 shadow-xl w-60 h-100 border border-pink-200"
        key={character.id}
        whileHover={{
          scale: 1.1,
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        <figure className="px-10 pt-10">
          {loading ? (
            <Skeleton circle width={158} height={158} />
          ) : (
            <Image
              src={character.image}
              alt="Character"
              width={256}
              height={256}
              className="rounded-full"
            />
          )}
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-[18px]">
            {loading ? <Skeleton height={30} width={174} /> : character.name}
          </h2>
          <div className="divider mt-auto mb-0"></div>
          <div className="flex w-full justify-between ">
            {loading ? (
              <Skeleton containerClassName="flex-1" width={174} />
            ) : (
              <>
                <div className=" text-pink-500">Gender:</div>
                <div className="text-right">{character.gender}</div>
              </>
            )}
          </div>
          <div className="flex w-full justify-between">
            {loading ? (
              <Skeleton containerClassName="flex-1" width={174} />
            ) : (
              <>
                <div className=" text-pink-500">Status:</div>
                <div className="text-right">{character.status}</div>
              </>
            )}
          </div>
          <div className="flex w-full justify-between">
            {loading ? (
              <Skeleton containerClassName="flex-1" width={174} />
            ) : (
              <>
                <div className=" text-pink-500">Species:</div>
                <div className="text-right">{character.species} </div>
              </>
            )}
          </div>

          <div className="card-actions">
            {loading ? (
              <Skeleton containerClassName="flex-1" height={48} width={174} />
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href={`/character/${character.id}`}
                  className="btn btn-primary text-yellow-100"
                >
                  Details
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

import { Character } from '../types/Character';
import Loading from '../loading';
import { Location } from '../types/Location';
import { Episode } from '../types/Episode';
import Image from 'next/image';

import { motion } from 'framer-motion';

type Props = {
  characters: Character[];
  location?: Location;
  episode?: Episode;
  title: string;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  caption: string;
  subTitle: string;
};

export const DialogList: React.FC<Props> = ({
  characters,
  title,
  location,
  episode,
  onClose,
  isLoading,
  caption,
  subTitle,
}) => {
  const preparedLocationName = location?.name.split('(')[0].trim();

  return (
    <dialog id="characters__list" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle bg-pink-200  btn-ghost absolute right-2 top-2 leading-8"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl pr-3 underline">
          {location
            ? `${title} "${preparedLocationName}"`
            : `${title} "${episode?.name}"`}
        </h3>
        <h3 className="font-bold text-xl pr-3 pt-2">
          {location
            ? `${subTitle} "${location.dimension}"`
            : `${subTitle} "${episode?.air_date}"`}
        </h3>
        <h3 className="font-bold text-center text-lg p-4">{caption}</h3>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {characters.map((character) => (
              <motion.div
                className="card bg-base-100 w-30 shadow-xl"
                key={character.id}
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ duration: 0.3 }}
              >
                <figure>
                  <Image
                    src={character.image}
                    alt="Rick Morty"
                    width={133}
                    height={133}
                  />
                </figure>

                <h2 className="text-sm p-2 text-center">{character.name}</h2>
              </motion.div>
            ))}
          </div>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button onClick={onClose} className="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

import { Character } from '../types/Character';
import Loading from '../loading';
import { Location } from '../types/Location';
import { Episode } from '../types/Episode';

type Props = {
  characters: Character[];
  location?: Location;
  episode?: Episode;
  title: string;
  onClose: () => void;
  isLoading: boolean;
  error: string;
  subTitle: string;
};

export const DialogList: React.FC<Props> = ({
  characters,
  title,
  location,
  episode,
  onClose,
  isLoading,
  subTitle,
}) => {
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
        <h3 className="font-bold text-2xl pr-3">
          {location
            ? `${title} "${location.name}"`
            : `${title} "${episode?.name}"`}
        </h3>
        <h3 className="font-bold text-center text-lg p-4">{subTitle}</h3>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {characters.map((character) => (
              <div
                className="card bg-base-100 w-30 shadow-xl"
                key={character.id}
              >
                <figure>
                  <img src={character.image} alt="Rick Morty" />
                </figure>

                <h2 className="text-sm p-2 text-center">{character.name}</h2>
              </div>
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

'use client';

import { useEffect } from 'react';
import useEpisodeCharacters from '../hooks/useEpisodeCharacters';
import Loading from '../loading';
import { Episode } from '../types/Episode';
import { DialogList } from './DialogList';

type Props = {
  episode: Episode;
  onClose: () => void;
};
export const CharactersModal: React.FC<Props> = ({ episode, onClose }) => {
  const [characters, error, isLoading, fetchCharacters] =
    useEpisodeCharacters();

  useEffect(() => {
    if (document) {
      (document.getElementById('my_modal_2') as HTMLFormElement).showModal();
    }

    if (!characters.length) {
      fetchCharacters(episode);
    }
  }, [characters.length, episode, fetchCharacters]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <DialogList
          characters={characters}
          title={'Episode:'}
          subTitle={'All characters:'}
          episode={episode}
          onClose={onClose}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
};

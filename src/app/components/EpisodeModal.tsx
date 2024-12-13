'use client';

import { useEffect } from 'react';
import useEpisodeCharacters from '../hooks/useEpisodeCharacters';
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
    const modal = document.getElementById(
      'characters__list'
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }

    if (!characters.length) {
      fetchCharacters(episode);
    }
  }, [characters.length, episode, fetchCharacters]);

  return (
    <DialogList
      characters={characters}
      title={'Episode:'}
      subTitle={'All characters:'}
      episode={episode}
      onClose={onClose}
      isLoading={isLoading}
      error={error}
    />
  );
};

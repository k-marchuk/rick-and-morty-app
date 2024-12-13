'use client';

import { useEffect } from 'react';
import { Location } from '../types/Location';
import { DialogList } from './DialogList';
import useLocationResidents from '../hooks/useLocationResidents';

type Props = {
  location: Location;
  onClose: () => void;
};

export const LocationModal: React.FC<Props> = ({ location, onClose }) => {
  const [residents, error, isLoading, fetchResidents] = useLocationResidents();

  useEffect(() => {
    if (document && residents.length) {
      (
        document.getElementById('characters__list') as HTMLDialogElement
      ).showModal();
    }

    if (!residents.length) {
      fetchResidents(location);
    }
  }, [residents.length, location, fetchResidents]);

  return (
    <DialogList
      characters={residents}
      title={'Location:'}
      subTitle={'All residents:'}
      location={location}
      onClose={onClose}
      isLoading={isLoading}
      error={error}
    />
  );
};

import React from 'react';
// components
import LibraryItem from '../../components/LibraryItem/LibraryItem';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedArtistsStart } from './libraryActions';
import Loader from '../../components/Loader/Loader';
import {
  SectionTitleContainer,
  SectionTitle,
  LibraryItemsContainer,
} from '../../components/LibraryItem/playlistItemStyles';
import useTitle from '../../hooks/useTitle';

const Artists = () => {
  const dispatch = useDispatch();
  useTitle('Slotify - Your Library');

  const { artists, loading } = useSelector(({ library }) => library);

  React.useEffect(() => {
    dispatch(getFollowedArtistsStart());
  }, [dispatch]);

  if (loading) return <Loader isLoading={loading} />;

  return (
    <div>
      <SectionTitleContainer>
        <SectionTitle>Artists</SectionTitle>
      </SectionTitleContainer>
      <LibraryItemsContainer>
        {artists?.map(art => (
          <LibraryItem
            key={art.id}
            id={art.id}
            title={art.name}
            cover={art.images[0].url}
            type='ARTIST'
            subtitle='Artist'
          />
        ))}
      </LibraryItemsContainer>
    </div>
  );
};

export default Artists;

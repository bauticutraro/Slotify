import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchStart } from './searchActions';
import {
  SectionTitle,
  SectionTitleContainer,
} from '../../components/LibraryItem/playlistItemStyles';
import Loader from '../../components/Loader/Loader';
import useNotifier from '../../hooks/useNotifier';
import TrackItem from '../../components/TrackItem/TrackItem';
import { SearchSongsContainer } from './searchStyles';

const Artist = () => {
  const dispatch = useDispatch();
  const { loading, error, list } = useSelector(({ search }) => search);

  const { showSnackbar } = useNotifier({
    message: 'Oooops something went wrong.',
  });

  const { name } = useParams();

  React.useEffect(() => {
    dispatch(searchStart({ query: name, type: 'track' }));
  }, [dispatch, name]);

  if (loading) return <Loader isLoading={loading} />;
  if (!loading && error) showSnackbar();

  return (
    <>
      <SectionTitleContainer>
        <SectionTitle>Showing Songs for "{name}"</SectionTitle>
      </SectionTitleContainer>
      <SearchSongsContainer>
        {list?.tracks?.items?.map((track, i) => (
          <TrackItem
            key={i}
            song={{ ...track }}
            hasImage={true}
            hasDuration={false}
            hasAlbum={false}
          />
        ))}
      </SearchSongsContainer>
    </>
  );
};

export default Artist;

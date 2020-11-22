import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlaylistStart,
  getUserTracksStart,
  checkUserFollowPlaylistStart,
  followPlaylistStart,
  getRandomTracksStart,
  checkLikeSongStart,
  cleanPlaylist,
} from './playlistsActions';
import { PlaylistContainer } from './playlistsStyles';
import { setList, startSong, pauseSong, cleanList } from '../Track/trackActions';

import PlaylistContent from '../../components/Playlist/PlaylistContent';
import Loader from '../../components/Loader/Loader';
// hooks
import useNotifier from '../../hooks/useNotifier';
import useTitle from '../../hooks/useTitle';

const Playlist = () => {
  const dispatch = useDispatch();

  const { playlist, following, loading, error } = useSelector(({ playlists }) => playlists),
    { id: userId } = useSelector(({ auth }) => auth.user);

  const isPlaying = useSelector(({ track: { isPlaying } }) => isPlaying);

  const playlistsList = playlist?.tracks?.items?.filter(({ track }) => track?.preview_url);

  const { id } = useParams(),
    { pathname } = useLocation();

  const { showSnackbar } = useNotifier({
    message: 'Oooops something went wrong.',
  });

  useTitle(`Spotify - ${playlist.name}`);

  useEffect(() => {
    if (!pathname.includes('/tracks')) {
      dispatch(getPlaylistStart({ id }));
    } else dispatch(getUserTracksStart());

    return () => {
      dispatch(cleanPlaylist());
      dispatch(cleanList());
    };
  }, [dispatch, id, pathname, userId]);

  useEffect(() => {
    if (playlist?.tracks?.items.length === 0) dispatch(getRandomTracksStart());
    if (!pathname.includes('/tracks'))
      dispatch(checkUserFollowPlaylistStart({ playlistId: id, userId }));
    dispatch(checkLikeSongStart());
  }, [playlist, dispatch, id, userId, pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color',
      pathname.includes('/tracks')
        ? '#5f54a0'
        : playlist?.tracks?.items?.length
        ? playlist.primary_color
        : '#a0c3d2'
    );

    return () => document.documentElement.style.setProperty('--color', '#121212');
  }, [pathname, playlist]);

  const handleFollow = () => {
    dispatch(
      followPlaylistStart({
        playlistId: playlist.id,
        action: following ? 'unfollow' : 'follow',
        userId,
      })
    );
  };

  const startPlaylist = () => {
    if (isPlaying) dispatch(pauseSong());
    else {
      dispatch(
        setList({
          list: playlist?.tracks?.items?.filter(({ track }) => track?.preview_url),
        })
      );
      dispatch(
        startSong({
          song: {
            ...playlistsList[0].track,
            cover: playlist.images
              ? playlist.images[0].url
              : 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
          },
        })
      );
    }
  };

  if (loading || !Object.keys(playlist).length) {
    document.documentElement.style.setProperty('--color', '#121212');
    return <Loader isLoading={loading} />;
  }

  if (!loading && error) showSnackbar();

  return (
    <PlaylistContainer>
      {!pathname.includes('/tracks') && playlist ? (
        <PlaylistContent
          playlist={playlist}
          following={following}
          handleFollow={handleFollow}
          startPlaylist={startPlaylist}
          isPlaying={isPlaying}
          userId={userId}
          inLibrary={playlistsList.some(pl => pl.id === playlist.id)}
        />
      ) : (
        <PlaylistContent
          playlist={playlist}
          startPlaylist={startPlaylist}
          isPlaying={isPlaying}
          isLikedSongs
          userId={userId}
        />
      )}
    </PlaylistContainer>
  );
};

export default Playlist;

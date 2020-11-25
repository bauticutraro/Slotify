import React, { useEffect, useMemo } from 'react';
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
import useIsPlaying from '../../hooks/useIsPlaying';

const Playlist = () => {
  const dispatch = useDispatch();

  const { playlist, following, loading, error } = useSelector(({ playlists }) => playlists),
    { id: userId } = useSelector(({ auth }) => auth.user);

  const playlistsList = playlist?.tracks?.items?.filter(({ track }) => track?.preview_url);

  const { id } = useParams(),
    { pathname } = useLocation();

  const { showSnackbar } = useNotifier({
    message: 'Oooops something went wrong.',
  });

  const isLikedSongs = useMemo(() => pathname.includes('/tracks'), [pathname]);

  const isPlaying = useIsPlaying(isLikedSongs ? 'likedSongs' : 'playlist', isLikedSongs ? '' : id);
  const songFrom = {
    type: isLikedSongs ? 'likedSongs' : 'playlist',
    id: isLikedSongs ? '' : playlist.id,
  };
  useTitle(`Slotify - ${isLikedSongs ? 'Liked songs' : playlist.name}`);

  useEffect(() => {
    if (!isLikedSongs) {
      dispatch(getPlaylistStart({ id }));
    } else dispatch(getUserTracksStart());

    return () => {
      dispatch(cleanPlaylist());
      dispatch(cleanList());
    };
  }, [isLikedSongs, dispatch, id, pathname, userId]);

  useEffect(() => {
    if (playlist?.tracks?.items.length === 0) dispatch(getRandomTracksStart());
    if (!isLikedSongs) dispatch(checkUserFollowPlaylistStart({ playlistId: id, userId }));
    dispatch(checkLikeSongStart());
  }, [isLikedSongs, playlist, dispatch, id, userId, pathname]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color',
      isLikedSongs
        ? '#5f54a0'
        : playlist?.tracks?.items?.length
        ? playlist.primary_color
        : '#a0c3d2'
    );

    return () => document.documentElement.style.setProperty('--color', '#121212');
  }, [isLikedSongs, pathname, playlist]);

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
    if (!playlistsList.length) return;
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
            from: { ...songFrom },
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
      {!isLikedSongs && playlist ? (
        <PlaylistContent
          playlist={playlist}
          isPlaylistsPlayable={playlistsList.length}
          following={following}
          handleFollow={handleFollow}
          startPlaylist={startPlaylist}
          isPlaying={isPlaying}
          userId={userId}
          songFrom={songFrom}
        />
      ) : (
        <PlaylistContent
          playlist={playlist}
          isPlaylistsPlayable={playlistsList.length}
          startPlaylist={startPlaylist}
          isPlaying={isPlaying}
          isLikedSongs
          userId={userId}
          songFrom={songFrom}
        />
      )}
    </PlaylistContainer>
  );
};

export default Playlist;

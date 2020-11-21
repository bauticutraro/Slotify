import api from '../../utils/api';

export const getUserPlaylists = () => api('/me/playlists');

export const getPlaylist = id => api(`/playlists/${id}?type=track%2Cepisode&market=from_token`);

export const getPlaylistTracks = id => api(`/playlists/${id}/tracks`);

export const getUserTracks = () => api(`/me/tracks`);

export const getRandomTracks = () =>
  api(
    `/tracks?ids=3n3Ppam7vgaVa1iaRUc9Lp%2C3twNvmDtFQtAd5gMKedhLD,7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B`
  );

export const createPlaylist = (userId, name = 'New Playlist') =>
  api(
    `/users/${userId}/playlists`,
    'POST',
    {},
    {
      name,
      public: true,
    }
  );

export const addTrackToPlaylist = (playlistId, tracksUris, method = 'POST') =>
  api(`/playlists/${playlistId}/tracks?uris=${tracksUris}`, method);

export const checkUserFollowPlaylist = (playlistId, userId) =>
  api(`/playlists/${playlistId}/followers/contains?ids=${userId}`);

export const followUnfollowPlaylist = (playlistId, action) =>
  api(`/playlists/${playlistId}/followers`, action === 'follow' ? 'PUT' : 'DELETE');

export const likeSong = (songId, action) =>
  api(`/me/tracks?ids=${songId}`, action === 'follow' ? 'PUT' : 'DELETE');

export const getUserSongs = () => api(`/me/tracks`);

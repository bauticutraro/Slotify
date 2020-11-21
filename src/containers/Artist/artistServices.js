import api from '../../utils/api';

export const getArtist = artistId => api(`/artists/${artistId}`);

export const getArtistTracks = artistId => api(`/artists/${artistId}/top-tracks?country=ES`);

export const getArtistAlbums = artistId =>
  api(`/artists/${artistId}/albums?include_groups=single%2Cappears_on&market=ES&limit=50`);

export const getArtistsRelated = artistId => api(`/artists/${artistId}/related-artists`);

export const isUserFollowing = artistId =>
  api(`/me/following/contains?type=artist&ids=${artistId}`);

export const followUnfollow = (artistId, action = 'follow') =>
  api(`/me/following?type=artist&ids=${artistId}`, action === 'follow' ? 'PUT' : 'DELETE');

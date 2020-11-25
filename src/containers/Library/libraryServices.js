import api from '../../utils/api';

export const getFollowedArtist = () => api('/me/following?type=artist');

export const getAlbums = () => api('/me/albums?limit=10');

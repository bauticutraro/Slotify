import api from '../../utils/api';

export const getTopArtists = () => api('/me/top/artists?limit=10');

export const getAlbums = () => api('/me/albums?limit=10');

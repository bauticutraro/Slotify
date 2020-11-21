import api from '../../utils/api';

export const getSearch = query => api(`/search?q=${query}&type=track%2Cartist`);

export const getArtistAlbums = artistId => api(`/artists/${artistId}/albums`);

export const getArtistSongs = artistId => api(`/artists/${artistId}/top-tracks?country=ES`);

export const getRelatedArtists = artistId => api(`/artists/${artistId}/related-artists`);

import api from '../../utils/api';

export const getAlbum = albumId => api(`/albums/${albumId}`);

export const saveAlbum = albumId => api(`/me/albums?ids=${albumId}`, 'PUT');

export const removeAlbum = albumId => api(`/me/albums?ids=${albumId}`, 'DELETE');

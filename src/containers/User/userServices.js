import api from '../../utils/api';

export const getUser = userId => api(`/users/${userId}`);

export const getUserPlaylists = userId => api(`/users/${userId}/playlists`);

import api from '../../utils/api';

export const getBrowse = () => api('/browse/categories');

export const getReleases = () => api('/browse/new-releases?limit=10');

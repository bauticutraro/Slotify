import api from '../../utils/api';

export const getUser = () => api('/me');

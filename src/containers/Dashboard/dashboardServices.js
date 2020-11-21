import api from '../../utils/api';

export const getRecentlyPlayed = () => api('/me/player/recently-played?type=track&limit=5');

export const getRecommendations = (artistsIds, tracksIds, genre) =>
  api(
    `/recommendations?limit=5&market=ES&seed_artists=1QOmebWGB6FdFtW7Bo3F0W&seed_genres=${genre}&seed_tracks=3oqWr0jDWNXxWufNogGREp`
  );

export const getFeaturedPlaylists = () => api(`/browse/featured-playlists?limit=5`);

export const getNewReleases = () => api(`/browse/new-releases?limit=5`);

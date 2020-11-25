import * as constants from './libraryConstants';

export const getFollowedArtistsStart = () => ({
  type: constants.GET_FOLLOWED_ARTISTS_START,
});

export const getFollowedArtistsSuccess = payload => ({
  type: constants.GET_FOLLOWED_ARTISTS_SUCCESS,
  payload,
});

export const getFollowedArtistsFailure = payload => ({
  type: constants.GET_FOLLOWED_ARTISTS_FAILURE,
  payload,
});

// Albums

export const getAlbumsStart = () => ({
  type: constants.GET_ALBUMS_START,
});

export const getAlbumsSuccess = payload => ({
  type: constants.GET_ALBUMS_SUCCESS,
  payload,
});

export const getAlbumsFailure = payload => ({
  type: constants.GET_ALBUMS_FAILURE,
  payload,
});

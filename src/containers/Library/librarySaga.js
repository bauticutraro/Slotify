import { all, fork, put, takeLatest } from 'redux-saga/effects';

import * as constants from './libraryConstants';
import * as actions from './libraryActions';
import * as services from './libraryServices';

function* getFollowedArtists() {
  try {
    const { artists } = yield services.getFollowedArtist();
    if (artists) yield put(actions.getFollowedArtistsSuccess({ artists: artists.items }));
  } catch (err) {
    yield put(actions.getFollowedArtistsFailure({ error: err.message }));
  }
}

function* getFollowedArtistsSaga() {
  yield takeLatest(constants.GET_FOLLOWED_ARTISTS_START, getFollowedArtists);
}

// Albums
function* getAlbums() {
  try {
    const { items: albums } = yield services.getAlbums();
    if (albums) yield put(actions.getAlbumsSuccess({ albums }));
  } catch (err) {
    yield put(actions.getAlbumsFailure({ error: err.message }));
  }
}

function* getAlbumsSaga() {
  yield takeLatest(constants.GET_ALBUMS_START, getAlbums);
}

export default function* librarySaga() {
  yield all([fork(getFollowedArtistsSaga), fork(getAlbumsSaga)]);
}

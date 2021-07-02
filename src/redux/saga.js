import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchAlbums() {

  const json = yield fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json());
  console.log('inside',json);
  yield put({ type: "ALBUMS_RECEIVED", json: json.data || [{ error: json.message }] });
}

function* actionWatcher() {
  yield takeLatest('GET_ALBUMS', fetchAlbums)
}


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
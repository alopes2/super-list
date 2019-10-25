import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';

import { authSaga } from './sagas';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH, authSaga)
    ]);
}
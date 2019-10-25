import { put } from 'redux-saga/effects';

import * as actions from '../actions';

import { auth } from '../../config/firebase';

export function* authSaga(action) {
    yield put(actions.authStart());

    try
    {
        var result = yield auth.getRedirectResult();
        console.log(result);
        actions.authSuccess(result.user);
    } catch(error) {
        console.error(error);
        actions.authFailed(error);
    }
}
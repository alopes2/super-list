import { put, select } from 'redux-saga/effects';

import * as actions from '../actions';

import { auth } from '../../config/firebase';

export function* authSaga(action) {
    const user = yield select(state => state.auth);

    if (user.token == null)
    {
        yield put(actions.authStart());

        try
        {
            const result = yield auth.getRedirectResult();
            yield console.log(result);
            const authUser =  yield {
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid,
                refreshToken: result.user.refreshToken,
                token: result.user.ma
            };
            yield put(actions.authSuccess(authUser));
        } catch(error) {
            yield console.error(error);
            yield put(actions.authFailed(error));
        }
    }
}
import { put, select } from 'redux-saga/effects';

import * as actions from '../actions';

import firebase, { auth } from '../../config/firebase';

export function* authSaga(action) {
    const user = yield select(state => state.auth);

    if (user.token == null)
    {
        yield put(actions.authStart());

        try
        {
            const result = yield auth.getRedirectResult();

            if (result.user == null)
            {
                const provider = yield new firebase.auth.FacebookAuthProvider();
                yield auth.signInWithRedirect(provider);
            }

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
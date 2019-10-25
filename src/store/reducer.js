import * as actionTypes from './actionTypes';

const initialState = {
    auth: {
        name: null,
        uid: null,
        accessToken: null,
        refreshToken: null,
        email: null
    },
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.AUTH_SUCCESS:
            var user = action.user;
            return {
                ...state,
                auth: {
                    ...state.auth,
                    name: user.name,
                    uid: user.uid,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    email: user.email
                },
                loading: false,
            };
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default reducer;
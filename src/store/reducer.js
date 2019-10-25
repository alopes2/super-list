const initialState = {
    auth: {
        name: null,
        uid: null,
        accessToken: null,
        refreshToken: null,
        email: null
    },
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;
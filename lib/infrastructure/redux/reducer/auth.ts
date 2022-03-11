import * as actionTypes from '../actions/actionTypes';

const initialState: AuthState = {
    token: ""
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case actionTypes.AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        default: return state;
    }
};

export default reducer;
import * as actionTypes from './actionTypes';

// Action creator
export function setToken(token: string): AuthAction {
    const action: AuthAction = {
        type: actionTypes.AUTH_SET_TOKEN,
        payload: token,
    }
    return action;
}
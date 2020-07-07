import {
    SIGNIN_SET_EMAIL,
    SIGNIN_SET_PASSWORD,
    SIGNIN_SUBMIT
} from './types';
import { formSubmit } from '../util/helpers';

export const setEmail = e => dispatch => {
    dispatch({ type: SIGNIN_SET_EMAIL, payload: e.target.value });
};

export const setPassword = e => dispatch => {
    dispatch({ type: SIGNIN_SET_PASSWORD, payload: e.target.value });
};

export const submit = () => (dispatch, getState) => {
    dispatch({ type: SIGNIN_SUBMIT });
    const body = getState().credentials.signin;
    const endpoint = 'signin';
    formSubmit(dispatch, body, endpoint);
};
import {
    REGISTER_SET_NAME,
    REGISTER_SET_EMAIL,
    REGISTER_SET_PASSWORD,
    REGISTER_SUBMIT,
} from './types';
import { formSubmit } from '../util/helpers';


export const setName = e => dispatch => {
    dispatch({ type: REGISTER_SET_NAME, payload: e.target.value });
}

export const setEmail = e => dispatch => {
    dispatch({ type: REGISTER_SET_EMAIL, payload: e.target.value });
}

export const setPassword = e => dispatch => {
    dispatch({ type: REGISTER_SET_PASSWORD, payload: e.target.value });
}

export const submit = () => (dispatch, getState) => {
    dispatch({ type: REGISTER_SUBMIT });
    const body = getState().credentials.register;
    const endpoint = 'register';
    formSubmit(dispatch, body, endpoint);
}
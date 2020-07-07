import {
    NAVIGATION_ADD_CREDITS,
    NAVIGATION_LOGOUT,
    NAVIGATION_RESEND_CONFIRMATION_EMAIL,
    CONFIRMATION_EMAIL_SUCCESS,
    CONFIRMATION_EMAIL_FAIL,
    SET_NOTIFICATION_MSG,
    SHOW_NOTIFICATION,
    ROUTE_CHANGE,
} from './types';
import constants from '../constants/constants';

export const addCredits = () => dispatch => {
    dispatch({ type: NAVIGATION_ADD_CREDITS });
    dispatch({ type: ROUTE_CHANGE, payload: constants.PAYMENT });
};

export const logout = () => (dispatch, getState) => {
    dispatch({ type: NAVIGATION_LOGOUT });
    fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/logout`, {
        method: 'PUT',
        ...constants.INCLUDE_CREDENTIAL_HEADER,
        body: JSON.stringify({
            credits: getState().user.credits
        })
    })
    .then(() => dispatch({ type: ROUTE_CHANGE, payload: constants.SIGN_IN }))
    .catch(console.log);
};

export const resendConfirmationEmail = () => dispatch => {
    dispatch({ type: NAVIGATION_RESEND_CONFIRMATION_EMAIL, payload: 'pending' });
    fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/confirmation/send`, {
        method: 'GET',
        ...constants.INCLUDE_CREDENTIAL_HEADER
    })
    .then(res => res.json())
    .then(res => {
        if (res[0] && res[0].statusCode === 202) {
            dispatch({ type: CONFIRMATION_EMAIL_SUCCESS, payload: 'success' });
            dispatch({ type: SET_NOTIFICATION_MSG, payload: {
                message: 'Email has been sent successfully. Please check your inbox',
                header: 'Email Status - SUCCESS',
                time: new Date()
            }});
        } else {
            throw new Error('Failed to send confirmation email');
        }
    })
    .catch(error => {
        dispatch({ type: CONFIRMATION_EMAIL_FAIL, payload: 'fail' });
        dispatch({ type: SET_NOTIFICATION_MSG, payload: {
            message: 'Failed to send confirmation email. Please retry or contact us',
            header: 'Email Status - FAILED',
            time: new Date()
        }});
        console.log(error);
    })
    .then((_) => {
        dispatch({ type: SHOW_NOTIFICATION, payload: {
            showNotification: true
        }});
    });
};
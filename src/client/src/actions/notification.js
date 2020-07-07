import {
    SET_NOTIFICATION_MSG,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from './types';

export const setNotification = (msgObj) => dispatch => {
    dispatch({ type: SET_NOTIFICATION_MSG, payload: msgObj });
};

export const showNotification = () => dispatch => {
    dispatch({ type: SHOW_NOTIFICATION, payload: {
        showNotification: true
    }});
};

export const hideNotification = () => dispatch => {
    dispatch({ type: HIDE_NOTIFICATION, payload: {
        showNotification: false
    }});
};
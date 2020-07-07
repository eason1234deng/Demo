import {
    ROUTE_CHANGE,
    LOAD_USER,
    UPDATE_UI_USER,
    UPDATE_DB_USER_CREDITS,
} from './types';
import constants from '../constants/constants';


export const loadUser = (cb) => dispatch => {
    fetch(process.env.REACT_APP_SERVER_HOME_PAGE, {
        method: 'GET',
        ...constants.INCLUDE_CREDENTIAL_HEADER
    })
    .then(response => {
        if (response.status === 200)
            return response.json();
        throw new Error('Failed to fetch user info');
    })
    .then(user => {
        if (user && user._id) {
            dispatch({ type: LOAD_USER, payload: {
                ...user,
                dirty: false
            }});
            dispatch({ type: ROUTE_CHANGE, payload: constants.HOME });
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: ROUTE_CHANGE, payload: constants.SIGN_IN });
    })
    .then(() => {
        if (cb) {
            cb();
        }
    });
};

export const updateUIUser = (user) => dispatch => {
    dispatch({ type: UPDATE_UI_USER, payload: user });
};

export const updateDBUserCredit = () => (dispatch, getState) => {
    dispatch({ type: UPDATE_DB_USER_CREDITS });
    fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/user/update/credits`, {
        method: 'PUT',
        ...constants.INCLUDE_CREDENTIAL_HEADER,
        body: JSON.stringify({
            credits: getState().user.credits
        })
    })
    .then(() => {
        const user = { ...getState().user, dirty: true };
        dispatch({ type: UPDATE_UI_USER, payload: user });
    })
    .catch(console.log);
};

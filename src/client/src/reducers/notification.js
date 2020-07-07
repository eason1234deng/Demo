import {
    SET_NOTIFICATION_MSG,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
} from '../actions/types';

const initialState = {
    showNotification: false,
    message: '',
    header: '',
    time: new Date(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_MSG:
        case SHOW_NOTIFICATION:
        case HIDE_NOTIFICATION:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
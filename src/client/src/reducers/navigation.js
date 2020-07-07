import {
    NAVIGATION_RESEND_CONFIRMATION_EMAIL,
    CONFIRMATION_EMAIL_FAIL,
    CONFIRMATION_EMAIL_SUCCESS
} from '../actions/types';

const initialState = {
    email: {
        status: 'fail'
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATION_RESEND_CONFIRMATION_EMAIL:
        case CONFIRMATION_EMAIL_FAIL:
        case CONFIRMATION_EMAIL_SUCCESS:
            return {
                email: {
                    ...state.email,
                    status: action.payload
                }
            }
        default:
            return state;
    }
};
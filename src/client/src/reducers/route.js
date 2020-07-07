import constants from '../constants/constants';
import {
    ROUTE_CHANGE,
} from '../actions/types';

const initialState = {
    route: constants.SIGN_IN
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ROUTE_CHANGE:
            return { ...state, route: action.payload };
        default:
            return state;
    }
};
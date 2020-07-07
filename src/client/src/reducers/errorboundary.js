import { ERROR_BOUNDARY_SET_ERROR_OBJECT } from '../actions/types';

const initialState = {
    error: null,
    errorInfo: null,
    hasError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_BOUNDARY_SET_ERROR_OBJECT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
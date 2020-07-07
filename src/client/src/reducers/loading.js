import { LOADING_SET_PROGRESS } from '../actions/types';

const initialState = {
    progress: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SET_PROGRESS:
            return {
                ...state, ...action.payload
            };
        default:
            return state;
    }
}
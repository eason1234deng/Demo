import { START_TRANSFORMING, STOP_TRANSFORMING } from '../actions/types';

const initializeState = {
    shouldTransform: false,
    reason: '',
};

export default (state = initializeState, action) => {
    switch (action.type) {
        case START_TRANSFORMING:
        case STOP_TRANSFORMING:
            return {
                ...state, ...action.payload
            };
        default:
            return state;
    }
};
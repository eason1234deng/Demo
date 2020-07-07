import {
    LOAD_USER,
    UPDATE_UI_USER
} from '../actions/types';

const initialState = {
    id: '',
    name: '',
    email: '',
    joined: '',
    credits: -1,
    dirty: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER:
        case UPDATE_UI_USER:
            return action.payload;
        default:
            return state;
    }
};
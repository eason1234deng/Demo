import {
    REGISTER_SET_NAME,
    REGISTER_SET_EMAIL,
    REGISTER_SET_PASSWORD,
    SIGNIN_SET_EMAIL,
    SIGNIN_SET_PASSWORD
} from '../actions/types';

const initialState = {
    register: {
        email: '',
        password: '',
        name: '',
    },
    signin: {
        email: '',
        password: '',
    }
};

export default (state = initialState, action) => {
    const newState = {
        register: { ...state.register },
        signin: { ...state.signin },
    };
    switch (action.type) {
        case REGISTER_SET_EMAIL:
            newState.register.email = action.payload;
            return newState;
        case REGISTER_SET_NAME:
            newState.register.name = action.payload;
            return newState;
        case REGISTER_SET_PASSWORD:
            newState.register.password = action.payload;
            return newState;

        case SIGNIN_SET_EMAIL:
            newState.signin.email = action.payload;
            return newState;
        case SIGNIN_SET_PASSWORD:
            newState.signin.password = action.payload;
            return newState;
        default:
            return state;
    }
} 

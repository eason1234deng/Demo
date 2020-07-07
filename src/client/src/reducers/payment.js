import {
    PAYMENT_INITIALIZE,
    PAYMENT_SUBMITTING,
    PAYMENT_SUBMIT_FAILED,
    PAYMENT_SET_PRICE
} from '../actions/types';

const initialState = {
    currency: '',
    price: '$0.00', // actually $$ user will be paying
    stripe: {},
    loading: false,
    paymentError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_INITIALIZE:
        case PAYMENT_SUBMITTING:
        case PAYMENT_SUBMIT_FAILED:
        case PAYMENT_SET_PRICE:
            return { ...state, ...action.payload};
        default:
            return state;
    }
};
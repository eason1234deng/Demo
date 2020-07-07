import {
    PRODUCT_SET_STATE,
    PRODUCT_COUNT_DECREMENT,
    PRODUCT_COUNT_INCREMENT
} from '../actions/types';

const initialState = {
    productId: 0,
    basePrice: 0,
    quantity: 1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_SET_STATE:
        case PRODUCT_COUNT_INCREMENT:
        case PRODUCT_COUNT_DECREMENT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
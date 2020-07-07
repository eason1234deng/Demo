import {
    PAYMENT_SET_PRICE,
    PRODUCT_COUNT_INCREMENT,
    PRODUCT_COUNT_DECREMENT
} from './types';
import { formatPrice } from '../util/helpers';
import constants from '../constants/constants';

export const decrement = () => (dispatch, getState) => {
    const { product } = getState();
    const quantity = Math.max(constants.MIN_TOP_UP_COUNT, product.quantity - 1);
    const price = formatPrice({
        amount: product.basePrice,
        currency: getState().payment.currency,
        quantity: quantity
    });
    
    dispatch({ type: PRODUCT_COUNT_DECREMENT, payload: { quantity }});
    dispatch({ type: PAYMENT_SET_PRICE, payload: { price } });
};

export const increment = () => (dispatch, getState) => {
    const { product } = getState();
    const quantity = Math.min(constants.MAX_TOP_UP_COUNT, product.quantity + 1);
    const price = formatPrice({
        amount: product.basePrice,
        currency: getState().payment.currency,
        quantity: quantity
    });
    
    dispatch({ type: PRODUCT_COUNT_INCREMENT, payload: { quantity }});
    dispatch({ type: PAYMENT_SET_PRICE, payload: { price } });
};
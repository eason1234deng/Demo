import { loadStripe } from '@stripe/stripe-js';
import {
    PAYMENT_INITIALIZE,
    PAYMENT_INITIALIZE_FAILED,
    PAYMENT_SUBMITTING,
    PAYMENT_SUBMIT_FAILED,
    PRODUCT_SET_STATE
} from './types';
import {
    fetchCheckoutSession,
    fetchStripeConfig,
    formatPrice
} from '../util/helpers';

export const stripeInit = () => async (dispatch, getState) => {
    try {
        const { publicKey, basePrice, currency } =  await fetchStripeConfig();
        const price = formatPrice({
            amount: basePrice,
            currency,
            quantity: getState().product.quantity
        });
        const stripe = await loadStripe(publicKey);
        dispatch({ type: PAYMENT_INITIALIZE, payload: { currency, stripe, price }});
        dispatch({ type: PRODUCT_SET_STATE, payload: { basePrice }});
    } catch (error) {
        console.log(error);
        dispatch({ type: PAYMENT_INITIALIZE_FAILED });
    }
};

export const submitPayment = () => async (dispatch, getState) => {
    dispatch({ type: PAYMENT_SUBMITTING, payload: { loading: true, paymentError: null }})
    const { sessionId } = await fetchCheckoutSession(getState().product.quantity);
    const { error } = await getState().payment.stripe.redirectToCheckout({ sessionId });

    if (error) {
        console.log(error);
        dispatch({ type: PAYMENT_SUBMIT_FAILED, payload: { loading: false, paymentError: error }})
    }
};
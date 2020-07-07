import { START_TRANSFORMING, STOP_TRANSFORMING } from './types';

export const startTransform = () => dispatch => {
    dispatch({ type: START_TRANSFORMING, payload: { shouldTransform: true }});
};

export const stopTransform = () => dispatch => {
    dispatch({ type: STOP_TRANSFORMING, payload: { shouldTransform: false }});
};
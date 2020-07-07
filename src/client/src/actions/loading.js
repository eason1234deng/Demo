import { LOADING_SET_PROGRESS } from './types';

export const setProgress = (progress) => dispatch => {
    dispatch({ type: LOADING_SET_PROGRESS, payload: { progress }});
};
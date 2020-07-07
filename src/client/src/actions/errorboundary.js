import { ERROR_BOUNDARY_SET_ERROR_OBJECT } from './types';

export const setError = (hasError, error, errorInfo) => dispatch => {
    dispatch({ type: ERROR_BOUNDARY_SET_ERROR_OBJECT, payload: { hasError, error, errorInfo }});
}
import {
    ROUTE_CHANGE
} from './types';

export const routeChange = (route) => dispatch => {
    dispatch({ type: ROUTE_CHANGE, payload: route });
};


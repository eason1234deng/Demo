import { OPEN_MODAL, CLOSE_MODAL } from './types';

export const openModal = (props) => dispatch => {
    dispatch({ type: OPEN_MODAL, payload: { ...props, show: true } });
};

export const closeModal = () => dispatch => {
    dispatch({ type: CLOSE_MODAL, payload: { show: false }});
};
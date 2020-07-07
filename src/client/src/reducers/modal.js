import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
    show: false,
    header: '',
    body: '',
    onHide: () => null,
    onYes: () => null,
    yesButtonText: 'yes',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
        case CLOSE_MODAL:
            return { ...initialState, ...action.payload };
        default:
            return state;
    }
};
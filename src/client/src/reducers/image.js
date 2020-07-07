import {
    IMAGE_HOVER,
    IMAGE_UNHOVER,
    IMAGE_SET_SUBMITTED_LINK,
    IMAGE_SET_INPUT_LINK,
    IMAGE_SET_FACE_BOX,
    IMAGE_DRAW_IMAGE,    
} from '../actions/types';

const initialState = {
    faceBoxes: [],
    draw: false,
    inputImageLink: '',
    submittedImageLink: '',
    topHovered: -1,
    leftHovered: -1,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_HOVER:
        case IMAGE_UNHOVER:
        case IMAGE_SET_SUBMITTED_LINK:
        case IMAGE_SET_INPUT_LINK:
        case IMAGE_SET_FACE_BOX:
        case IMAGE_DRAW_IMAGE:
            return { ...state, ...action.payload };
        default:
            return state;
    };
};
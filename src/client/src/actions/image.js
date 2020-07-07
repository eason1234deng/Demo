import Clarifai from 'clarifai';
import {
    IMAGE_HOVER,
    IMAGE_UNHOVER,
    IMAGE_SET_SUBMITTED_LINK,
    IMAGE_SET_INPUT_LINK,
    IMAGE_DETECT_FACE,
    IMAGE_SET_FACE_BOX,
    UPDATE_UI_USER,
    START_TRANSFORMING,
    IMAGE_DRAW_IMAGE,
} from './types';

import constants from '../constants/constants';
import { calculateFaceLocation } from '../util/helpers';

const clarifyApp = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFI_API_KEY
});

export const imageSetLink = (e) => dispatch => {
    dispatch({ type: IMAGE_SET_INPUT_LINK, payload: { inputImageLink: e.target.value }});
};

export const imageDetectFace = () => (dispatch, getState) => {
    // Set submittedImageLink for display and update user object
    const submittedImageLink = getState().image.inputImageLink;
    let user = getState().user;
    user = { ...user, credits: Math.max(0, user.credits - 1), dirty: true };
    dispatch({ type: IMAGE_SET_SUBMITTED_LINK, payload: { submittedImageLink }});
    dispatch({ type: UPDATE_UI_USER, payload: user });

    // Call the face detection AI model
    dispatch({ type: IMAGE_DETECT_FACE });
    clarifyApp.models.predict(Clarifai.FACE_DETECT_MODEL, submittedImageLink)
        .then((response) => {
            if (response) {
                const faceBoxes = calculateFaceLocation(response);
                dispatch({ type: START_TRANSFORMING, payload: { shouldTransform: true, reason: constants.DRAW_IMAGE }});
                dispatch({ type: IMAGE_SET_FACE_BOX, payload: { faceBoxes, draw: false }});
            }
        })
        .catch(error => 
            dispatch({ type: IMAGE_SET_FACE_BOX, payload: { faceBoxes: [], faceAIError: error } })
        );
};

export const drawImage = () => dispatch => {
    dispatch({ type: IMAGE_DRAW_IMAGE, payload: { draw: true }});
};

export const imageHover = (topHovered, leftHovered) => dispatch => {
    dispatch({ type: IMAGE_HOVER, payload: { topHovered, leftHovered }});
};

export const imageUnhover = () => dispatch => {
    dispatch({ type: IMAGE_UNHOVER, payload: constants.IMAGE_UNHOVER_POSITION });
};
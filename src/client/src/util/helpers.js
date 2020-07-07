import {
    LOAD_USER,
    ROUTE_CHANGE
} from '../actions/types';

import constants from '../constants/constants';

export const calculateFaceLocation = (response) => {
    const clarifaiFaces = response.outputs[0].data.regions.map(region => region.region_info.bounding_box);

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map(clarifaiFace => ({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
    }));
};

export const formSubmit = (dispatch, body, endpoint) => {
    fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/${endpoint}`, {
        method: 'POST',
        ...constants.INCLUDE_CREDENTIAL_HEADER,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(user => {
        dispatch({ type: LOAD_USER, payload: user });
        dispatch({ type: ROUTE_CHANGE, payload: constants.HOME });
    })
    .catch(console.log);
};

export const fetchStripeConfig = async () => {
    return fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/config/stripe`, {
        method: 'GET',
        ...constants.INCLUDE_CREDENTIAL_HEADER
    }).then(response => response.json());
};

export const formatPrice = ({ amount, currency, quantity }) => {
    const numberFormat = new Intl.NumberFormat(constants.LOCALES, { // format price and add currency symbol based on Locales
        style: 'currency',
        currency
    });

    const total = (quantity * amount / 100).toFixed(2); // convert cents to dollar
    return numberFormat.format(total);
};

export const fetchCheckoutSession = async (quantity) => {
    return fetch(`${process.env.REACT_APP_SERVER_HOME_PAGE}/create-checkout-session`, {
        method: 'POST',
        ...constants.INCLUDE_CREDENTIAL_HEADER,
        body: JSON.stringify({
            quantity: quantity
        })
    }).then(response => response.json());
};

export const compare = (box1, box2) => {
    const yDiff = box2.topRow - box1.topRow;
    if (yDiff > constants.MIN_HEIGHT_THRESHOLD) {
        return -1;
    } else if (yDiff < -constants.MIN_HEIGHT_THRESHOLD) {
        return 1;
    }
    return box1.leftCol - box2.leftCol;
};

export const computeTimeElapsed = (startTime, endTime) => {
    const timeDiff = endTime - startTime; // in ms
    const timeElapsedInSec = Math.round(timeDiff / 1000); // in s
    const minutesElapsed = Math.floor(timeElapsedInSec / 60);
    const secElapsed = minutesElapsed > 0
                        ? timeElapsedInSec % 60
                        : Math.max(1, timeElapsedInSec % 60);
    let timeString = 'ago';
    timeString = `${secElapsed} sec ${timeString}`;
    if (minutesElapsed > 0) {
        timeString += `${minutesElapsed} mins ${timeString}`;
    }

    return timeString;

};

export const randomNumGenGivenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
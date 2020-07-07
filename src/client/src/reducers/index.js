import { combineReducers } from 'redux';
import credentialsReducer from './credentials';
import routeReducer from './route';
import userReducer from './user';
import imageReducer from './image';
import paymentReducer from './payment';
import productReducer from './product';
import errorBoundaryReducer from './errorboundary';
import modalReducer from './modal';
import navigationReducer from './navigation';
import notificaitonReducer from './notification';
import transformReducer from './transform';
import loadingReducer from './loading';

export default combineReducers ({
    credentials: credentialsReducer,
    route: routeReducer,
    user: userReducer,
    image: imageReducer,
    payment: paymentReducer,
    product: productReducer,
    errorBoundary: errorBoundaryReducer,
    modal: modalReducer,
    navigation: navigationReducer,
    notification: notificaitonReducer,
    transform: transformReducer,
    loading: loadingReducer,
});
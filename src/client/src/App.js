import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import cx from 'classnames';
import { BrowserRouter, Route } from 'react-router-dom';

import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Logo from './Components/Logo/Logo';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Balance/Balance';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import Payment from './Components/Payment/Payment';
import Notification from './Components/Notification/Notification';
// import Loading from './Components/Loading/Loading';
import * as userActions from './actions/user';
import * as transformActions from './actions/transform';
import * as imageActions from './actions/image';
import constants from './constants/constants';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.logo = <Logo />; // Don't want this to re-render -> there is some issue with react-parallax-tilt

        this.componentCleanup = this.componentCleanup.bind(this);
    }
    
    componentDidMount() {
        this.props.loadUser();
        window.addEventListener('beforeunload', this.componentCleanup);   
    }

    componentDidUpdate() {
        const { transform: { shouldTransform, reason }, stopTransform } = this.props;
        if (shouldTransform) {
            setTimeout(() => {
                stopTransform();
                if (reason === constants.DRAW_IMAGE) {
                    setTimeout(() => {
                        this.props.drawImage();
                    }, 200); // draw image 200ms after screen stops transforming
                }
            }, 1000); // AI model just applied, let the screen transform for a sec before stoping it
        }
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    componentCleanup() {
        if (this.props.user.dirty) {
            this.props.updateDBUserCredit();
        }
    }

    fixModalDimension() {
        const modalWrapper = document.getElementById('modal');
        if (modalWrapper) {
            const body = document.body;
            const html = document.documentElement;
            // Get document width and height
            const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

            const width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

            // Make sure modal cover entire document
            modalWrapper.style.height = `${height}px`;
            modalWrapper.style.width = `${width}px`
        }
    }

    render() {
        const { route, transform: { shouldTransform }} = this.props;
        let signinProp = {};
        let registerProp = {};
        if (route === constants.SIGN_IN) {
            signinProp = {
                active: true
            };
        } else if (route === constants.REGISTER) {
            registerProp = {
                active: true
            };
        }

        return (
            <BrowserRouter>
                <div className={shouldTransform ? cx("App", "squiggle-animation") : "App"}>
                    <Notification/>
                    <Route path='/'>
                        {
                            route !== constants.PAYMENT && <Particles
                                params={constants.PARTICLE_OPTIONS}
                                className="particles"
                            />
                        }
                        {
                            // If either component should be render, render both of them at the same time
                            (route === constants.SIGN_IN || route === constants.REGISTER) &&
                            <React.Fragment>
                                <Signin {...signinProp} />
                                <Register {...registerProp} />
                            </React.Fragment>
                        }
                        {
                            route === constants.PAYMENT && <Payment />
                        }
                        {
                            route === constants.HOME &&
                            <div>
                                <Navigation />
                                {this.logo}
                                <Rank />
                                <ImageLinkForm />
                                <FaceRecognition />
                            </div>
                        }
                        </Route>
                    {
                        // <Route path='/' component={Loading} />
                    }
                    {
                        /**
                         * 
                         * div#countDown is used by ErrorBoundary to count down a redirect timer 
                         */
                    }
                    <div id="countDown"></div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ route, user, transform }) => ({ ...route, user, transform });


App.propTypes = {
    route: PropTypes.string.isRequired,
    user: PropTypes.shape({
        dirty: PropTypes.bool
    }).isRequired,
    transform: PropTypes.shape({
        reason: PropTypes.string.isRequired,
        shouldTransform: PropTypes.bool.isRequired
    }).isRequired,
    loadUser: PropTypes.func.isRequired,
    updateDBUserCredit: PropTypes.func.isRequired,
    drawImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...userActions, ...transformActions, ...imageActions })(App);

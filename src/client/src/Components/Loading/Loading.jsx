import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Carousel from 'react-bootstrap/Carousel';
import * as userActions from '../../actions/user';
import * as loadingAction from '../../actions/loading';
import { randomNumGenGivenRange } from '../../util/helpers';

import './Loading.scss';

class Loading extends Component {
    componentDidMount() {
        this.props.loadUser(() => this.slowLoading());
    }

    componentDidUpdate() {
        if (this.props.user && this.props.user._id) {
            this.slowLoading();
        }
    }

    slowLoading() {
        const maxTime = 50;
        const minTime = 10;
        const time = randomNumGenGivenRange(minTime, maxTime);
        const maxInc = 25;
        const minInc = 10;
        const increment = Math.floor(Math.random() * (maxInc - minInc) + minInc);
        if (this.props.loading.progress >= 100) {
            this.props.history.push('/home');
            return;
        }
        setTimeout(() => {
            const newProgress = Math.min(100, this.props.loading.progress + increment);
            this.props.setProgress(newProgress);
        }, time);
    }

    render() {
        const { progress } = this.props.loading;
        return (
            <div className='wrapper'>
                <div className='loading-message'>Page is loading, please wait. We will redirect you to the home page shortly</div>
                <ProgressBar animated now={progress} label={`${progress}%`}/>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/280/320?random=6"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/280/320?random=7"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/280/320?random=8"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = ({ loading, user }) => ({ loading, user });

Loading.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.shape({
        progress: PropTypes.number,
    }).isRequired,
    setProgress: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { ...userActions, ...loadingAction })(withRouter(Loading));
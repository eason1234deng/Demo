import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/errorboundary';

class ErrorBoundary extends Component {
    componentDidCatch(error, errorInfo) {
        this.props.setError({
            hasError: true,
            error,
            errorInfo
        });
        console.log(error, errorInfo);
    }

    countdown(counter) {
        setTimeout(() => {
            if (counter > 1) {
                let newCounter = counter - 1;
                document.getElementById('countDown').innerHTML = `Oooops. Something went wrong. You will be redirected to home page in ${newCounter} seconds`;
                this.countdown(newCounter);
            } else {
                window.location = '/';
            }
        }, 1000);
    }

    render() {
        if (this.props.state.hasError) {    
            const counter = 5;
            this.countdown(counter);        
            return <h1 id="countDown">{`Oooops. Something went wrong. You will be redirected to home page in ${counter} seconds`}</h1>
        }

        return this.props.children;
    }
}

const mapStateToProps = ({ errorBoundary }) => ({ state: errorBoundary });

ErrorBoundary.propTypes = {
    state: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default connect(mapStateToProps, actions)(ErrorBoundary);
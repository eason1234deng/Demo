import React, { Component } from 'react';
import * as notificationActions from '../../actions/notification';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { computeTimeElapsed } from '../../util/helpers';
import './styles.scss';

class Notification extends Component {
    render () {
        const { 
            notification: {
                showNotification,
                message,
                header,
                time
            },
            hideNotification
        } = this.props;
        // Notification displays for 5 seconds before fading out
        return (
            <Toast onClose={hideNotification} show={showNotification} delay={5000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">{header}</strong>
                    <small>{computeTimeElapsed(time, new Date())}</small>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        )
    }
}

const mapStateToProps = ({ notification }) => ({ notification });

Notification.propTypes = {
    notification: PropTypes.shape({
        showNotification: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        time: PropTypes.object.isRequired,
    }),
    hideNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, notificationActions)(Notification);
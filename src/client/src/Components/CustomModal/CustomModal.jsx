import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import cx from 'classnames';
import * as actions from '../../actions/modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

class CustomModal extends Component {
    render() {
        const {
                header,
                body,
                bodyComponent,
                yesButtonText,
                noButtonText,
                onHide,
                onYes,
                bodyClassName,
                ...rest
        } = this.props.modal;

        return (
            <Modal
                {...rest}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-wrapper"
            >
                <Modal.Header closeButton={this.props.closeButton}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx(bodyClassName, 'modal-body')}>
                    <p>{body}</p>
                    {bodyComponent}
                </Modal.Body>
                <Modal.Footer>
                    {
                        noButtonText &&
                        <Button variant="danger" onClick={onHide}>{noButtonText}</Button>
                    }
                    {
                        yesButtonText && 
                        <Button onClick={onYes}>{yesButtonText}</Button>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = ({ modal }) => ({ modal });

CustomModal.defaultProps = {
    bodyComponent: null,
    closeButton: true,
    yesButtonText: null,
    noButtonText: null
};

CustomModal.propTypes = {
    modal: PropTypes.shape({
        header: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        bodyComponent: PropTypes.node,
        onYes: PropTypes.func.isRequired,
        onHide: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        yesButtonText: PropTypes.string,
        noButtonText: PropTypes.string,
        bodyClassName: PropTypes.string,
        closeButton: PropTypes.bool
    })
};

export default connect(mapStateToProps, actions)(CustomModal);
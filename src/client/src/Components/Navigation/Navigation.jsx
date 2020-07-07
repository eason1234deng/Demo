import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tilt from 'react-parallax-tilt';
import * as navigationActions from '../../actions/navigation';
import * as modalActions from '../../actions/modal';
import emailPendingIcon from '../../icons/email_pending_colored.png';
import logoutIcon from '../../icons/logout.png';
import addCreditsIcon from '../../icons/pay.png';
import './styles.scss';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.onResendEmail = this.onResendEmail.bind(this);
    }

    onResendEmail() {
        const sendEmailIntentModalProps = {
            header: 'Do You Want to Resent Confirmation Email?',
            body: `Please click SEND below to resend confirmation, the email will be sent to ${this.props.user.email}. The email will be sent within 5 minutes.`,
            onYes: () => {
                this.props.closeModal();
                this.props.resendConfirmationEmail();
            },
            onHide: this.props.closeModal,
            yesButtonText: 'Send',
            noButtonText: 'Cancel',
        };

        this.props.openModal(sendEmailIntentModalProps);
    }

    render() {
        const { user: { confirmed }, addCredits, logout } = this.props;

        return (
            <nav className="container">
                <div
                    className='oauthButton mv4 mr2'
                    onClick={addCredits}>
                    <Tilt
                        className="parallax-effect-glare-scale"
                        perspective={800}
                        scale={1.05}
                    >
                        <img alt="Add Credits" title="Click To Add Credits" src={addCreditsIcon}/>
                    </Tilt>
                </div>
                <div
                    className='oauthButton mv4 mh4'
                    onClick={logout}>
                    <Tilt
                        className="parallax-effect-glare-scale"
                        perspective={800}
                        scale={1.05}
                    >
                        <img alt="Logout" title="Click To Logout" src={logoutIcon} />
                    </Tilt>
                </div>
                {   !confirmed &&
                    <div
                        className='oauthButton mv4'
                        tabIndex="0"
                        onClick={this.onResendEmail}
                    >
                        <Tilt
                            className="parallax-effect-glare-scale"
                            perspective={800}
                            scale={1.05}
                        >
                            <img alt="Email Verification Pending" title="Email Verification Needed, Click to Resend Email" src={emailPendingIcon} />
                        </Tilt>
                    </div>
                }
            </nav>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

Navigation.propTypes = {
    user: PropTypes.object.isRequired,
    addCredits: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    resendConfirmationEmail: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...navigationActions, ...modalActions })(Navigation); 
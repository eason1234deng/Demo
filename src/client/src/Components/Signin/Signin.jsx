import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as signinActions from '../../actions/signin';
import * as routeActions from '../../actions/route';
import constants from '../../constants/constants';
import github from '../../icons/github.png';
import googlePlus from '../../icons/google-plus.png';
import './styles.scss';

class Signin extends Component {
    render() {
        const inputClassName = 'pa2 input-reset ba hover-bg-black hover-white w-100';
        const labelClassName = "db fw6 lh-copy f6 mb0 pb2";

        const { setEmail, setPassword, submit, routeChange, active }  = this.props;
        const { email, password } = this.props.signin;

        return (
            <div className={`signin-container ${active ? '' : 'hide-page'}`}>
                <div className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 center shadow-5">
                    <main className="pa4 black-80 zindex">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className={labelClassName} htmlFor="email-address">Email</label>
                                    <input
                                        className={inputClassName}
                                        type="email"
                                        name="email-address"
                                        id="email-address-login"
                                        onChange={setEmail}
                                        value={email}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className={labelClassName} htmlFor="password">Password</label>
                                    <input
                                        className={`b ${inputClassName}`}
                                        type="password"
                                        name="password"
                                        id="password-login"
                                        onChange={setPassword}
                                        password={'*'.repeat(password.length)}
                                    />
                                </div>
                            </fieldset>
                            <div>
                                <input
                                    className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib padding"
                                    type="submit"
                                    value="Sign in"
                                    onClick={submit}
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <input
                                    className="dim input-reset b--transparent bg-transparent pointer padding f6"
                                    type="submit"
                                    value="Register"
                                    onClick={() => routeChange(constants.REGISTER)}
                                />
                            </div>
                        </div>
                    </main>
                </div>
                {
                    // OAuth
                }
                <div className='br3 ba b--black-10 mv4 w-100 w-50-m mw6 center flex-wrap shadow-5'>
                    <div className='w-100 mt2 bodoni'>Login with social</div>
                        <div
                            className='oauthButton mv3 mh2'
                            onClick={() => {
                                window.location = `${process.env.REACT_APP_SERVER_HOME_PAGE}/auth/github`;
                            }}
                            alt="Github"
                            data-nolink="false"
                            title="Github">
                            <img alt="Github" title="Github"
                                src={github} />
                        </div>
                        <div
                            className = 'oauthButton mv3 mh2'
                            onClick={() => {
                                window.location = `${process.env.REACT_APP_SERVER_HOME_PAGE}/auth/google`;
                            }}
                            alt="Google"
                            data-nolink="false"
                            title="Google">
                            <img alt="Google" title="Google "
                                src={googlePlus} />
                        </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ user, credentials: { signin } }) => ({ user, signin });

Signin.defaultProps = {
    email: '',
    password: '',
};

Signin.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    routeChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { ...routeActions, ...signinActions })(withRouter(Signin));
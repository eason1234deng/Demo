import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../../constants/constants';
import * as registerActions from '../../actions/register';
import * as routeActions from '../../actions/route';
import './styles.scss';

class Register extends Component {
    render() {
        const inputClassName = 'pa2 input-reset ba hover-bg-black hover-white w-100';
        const labelClassName = "db fw6 lh-copy f6 mb0 pb2";

        const {
            email, password, name, active
        } = this.props;

        return (
            <article className={`br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 article ${active ? '' : 'hide-page'}`}>
                <main className="pa4 black-80 main">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className={labelClassName} htmlFor="name">Name</label>
                                <input
                                    className={inputClassName}
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.props.setName}
                                    value={name}
                                />
                            </div>
                            <div className="mt3">
                                <label className={labelClassName} htmlFor="email-address">Email</label>
                                <input
                                    className={inputClassName}
                                    type="text"
                                    name="email-address"
                                    id="email-address-reg"
                                    onChange={this.props.setEmail}
                                    value={email}
                                />
                            </div>
                            <div className="mv3">
                                <label className={labelClassName} htmlFor="password">Password</label>
                                <input
                                    className={`b ${inputClassName}`}
                                    type="password"
                                    name="password"
                                    id="password-reg"
                                    onChange={this.props.setPassword}
                                    password={'*'.repeat(password.length)}
                                    ref={(ref) => this.ref = ref}
                                />
                            </div>
                        </fieldset>
                        <div>
                            <input
                            className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer"
                            type="submit"
                            value="Register"
                            onClick={this.props.submit}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <input
                                className="dim input-reset b--transparent bg-transparent pointer padding f6"
                                type="submit"
                                value="Go Back to Sign In"
                                onClick={() => this.props.routeChange(constants.SIGN_IN)}
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
};

const mapStateToProps = ({ credentials: { register } }) => register;

Register.defaultProps = {
    email: null,
    password: null,
    name: null,
};

Register.propTypes = {
    email: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]).isRequired,
    password: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]).isRequired,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]).isRequired,
    setName: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    routeChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...routeActions, ...registerActions })(Register);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Balance extends Component {
    render() {
        const { name, credits } = this.props.state;
        return (
            <div>
                <div className="white f3">
                    {`${name}, Your Remaining Balance is: `}
                </div>
                <div className="white f1">
                    {`$${credits}`}
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({ user }) => ({ state: user });

Balance.propTypes = {
    name: PropTypes.string,
    credits: PropTypes.number
};

export default connect(mapStateToProps)(Balance);
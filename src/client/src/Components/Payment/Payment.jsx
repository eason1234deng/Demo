import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import * as productActions from '../../actions/product';
import * as paymentActions from '../../actions/payment';
import constants from '../../constants/constants';
import './styles.scss';

class Payment extends Component {
    componentDidMount() {
        this.props.stripeInit();
    }

    render() {
        const {
            stripe,
            loading,
            paymentError,
            price,
            quantity,
            submitPayment,
            increment,
            decrement
        } = this.props;
        // Hard-coded products for now - need to fetch from server in production
        return (
            <div className="sr-root pa4">
                <div className="sr-main">
                    <section className="container shadow-5 br3 b--black-10 ba">
                        <div className=''>
                            <h1>Stripe Payment</h1>
                            <h4>Purchase Credit</h4>
                            <div>
                                <img
                                    alt="Random asset from Picsum"
                                    src="https://picsum.photos/280/320?random=4"
                                    width="140"
                                    height="160"
                                />
                            </div>
                        </div>
                        <div></div>
                        <div className="quantity-setter">
                            <button
                                disabled={quantity <= constants.MIN_TOP_UP_COUNT}
                                onClick={decrement}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                id="quantity-input"
                                min="1"
                                max="10"
                                value={quantity}
                                readOnly
                            />
                            <button
                                disabled={quantity >= constants.MAX_TOP_UP_COUNT}
                                onClick={increment}
                            >
                                +
                            </button>
                        </div>
                        <p className="sr-legal-text">{`Number of top-ups (max ${constants.MAX_TOP_UP_COUNT})`}</p>

                        <button
                            role="link"
                            onClick={submitPayment}
                            disabled={!stripe || loading}
                            className='submit-payment'
                        >
                            {loading || !price
                                ? `Loading...`
                                : `Buy for ${price}`}
                        </button>
                        <Button variant="warning" className='back-button' onClick={() => window.location = '/'}>Back</Button>
                        <div className="sr-field-error">{paymentError && paymentError.message}</div>
                    </section>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ product, payment }) => {
    const { stripe, loading, paymentError, price } = payment;
    const { quantity } = product;
    
    return {
        stripe, loading, paymentError, price, quantity
    }
}

Payment.propTypes = {
    quantity: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    paymentError: PropTypes.object,
    price: PropTypes.string.isRequired,
    stripe: PropTypes.object.isRequired,
    stripeInit: PropTypes.func.isRequired,
    submitPayment: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { ...paymentActions, ...productActions })(Payment);
import { useState, useContext, Fragment } from 'react';
import Billing from './Billing';
import YourOrder from './YourOrder';
import PaymentModes from './PaymentModes';
import { AppContext } from '../context/AppContext';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import { SubHeading } from '../typography';

const CheckoutForm = () => {
    const [cart] = useContext(AppContext);

    const initialState = {
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetAddressOne: '',
        streetAddressTwo: '',
        city: '',
        county: '',
        postCode: '',
        phone: '',
        email: '',
        createAccount: false,
        orderNotes: '',
        paymentMode: '',
        errors: null
    };

    const [input, setInput] = useState(initialState);

    /*
     * Handle form submit.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const result = validateAndSanitizeCheckoutForm(input);
        if (!result.isValid) {
            setInput({ ...input, errors: result.errors });
        }
    };

    /*
     * Handle onchange input.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleOnChange = (event) => {
        if ('createAccount' === event.target.name) {
            const newState = { ...input, [event.target.name]: !input.createAccount };
            setInput(newState);
        } else {
            const newState = { ...input, [event.target.name]: event.target.value };
            setInput(newState);
        }
    };

    return (
        <Fragment>
            {cart ? (
                <form onSubmit={handleFormSubmit} className="wd-checkout-form">
                    <div className="row">
                        {/*Billing Details*/}
                        <div className="col-lg-6 col-md-12">
                            <SubHeading className="mb-4">Billing Details</SubHeading>
                            <Billing input={input} handleOnChange={handleOnChange} />
                        </div>
                        {/* Order & Payments*/}
                        <div className="col-lg-6 col-md-12">
                            {/*	Order*/}
                            <SubHeading className="mb-4">Your Order</SubHeading>
                            <YourOrder cart={cart} />

                            {/*Payment*/}
                            <PaymentModes input={input} handleOnChange={handleOnChange} />
                            <div className="wd-place-order-btn-wrap mt-5">
                                <button
                                    className="btn wd-large-black-btn wd-place-order-btn"
                                    type="submit">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                ''
            )}
        </Fragment>
    );
};

export default CheckoutForm;

const PaymentModes = () => {
	return (
		<div className="mt-5">
			{/*Pay with Paypal*/}
			<div className="form-check wd-payment-input-container">
				<label className="form-check-label">
					<input className="form-check-input" name="createAccount" type="radio" value="true"/>
					<span className="wd-payment-content">Pay with Paypal</span>
				</label>
			</div>
			{/*Pay with Stripe*/}
			<div className="form-check wd-payment-input-container">
				<label className="form-check-label">
					<input className="form-check-input" name="createAccount" type="radio" value="true"/>
					<span className="wd-payment-content">Pay with Stripe</span>
				</label>
			</div>
			{/*	Payment Instructions*/}
			<div className="wd-checkout-payment-instructions">
				Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.
			</div>
		</div>
	);
};

export default PaymentModes;

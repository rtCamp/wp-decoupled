import React from 'react';
import countryList from './country-list';

const Billing = ( { input, handleOnChange } ) => {
	return (
		<React.Fragment>
			{/*Name*/}
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="form-group">
						<label htmlFor="first-name">
							First Name
							<abbr className="required" title="required">*</abbr>
						</label>
						<input onChange={ handleOnChange } value={ input.firstName } type="text" name="firstName" className="form-control wd-checkout-input" id="first-name"/>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12">
					<div className="form-group">
						<label htmlFor="last-name">
							Last Name
							<abbr className="required" title="required">*</abbr>
						</label>
						<input onChange={ handleOnChange } value={ input.lastName } type="text" name="lastName" className="form-control wd-checkout-input" id="last-name"/>
					</div>
				</div>
			</div>
			{/* Company Name */}
			<div className="form-group">
				<label htmlFor="first-name">Company Name</label>
				<input onChange={ handleOnChange } value={ input.companyName } type="text" name="companyName" className="form-control wd-checkout-input" id="first-name"/>
			</div>
			{/* Country */}
			<div className="form-group">
				<label htmlFor="country-select">
					Country
					<abbr className="required" title="required">*</abbr>
				</label>
				<select onChange={ handleOnChange } value={ input.country } name="country" className="form-control wd-checkout-input" id="country-select">
					{ countryList.length && (
						countryList.map( ( country, index ) => (
							<option key={ `${country}-${index}` } value={ country }>{ country }</option>
						) )
					) }
				</select>
			</div>
			{/* Street Address */}
			<div className="form-group">
				<label htmlFor="street-address">
					Street Address
					<abbr className="required" title="required">*</abbr>
				</label>
				<input type="text" onChange={ handleOnChange } value={ input.streetAddressOne } name="streetAddressOne" placeholder="House number and street name" className="form-control wd-checkout-input" id="street-address"/>
				<br/>
				<input type="text" onChange={ handleOnChange } value={ input.streetAddressTwo } name="streetAddressTwo" placeholder="Apartment, suite, unit etc.(optional)" className="form-control wd-checkout-input" id="first-name"/>
			</div>
			{/* Town/City */}
			<div className="form-group">
				<label htmlFor="city">
					Town/City
					<abbr className="required" title="required">*</abbr>
				</label>
				<input onChange={ handleOnChange } value={ input.city } type="text" name="city" className="form-control wd-checkout-input" id="city"/>
			</div>
			{/* County */}
			<div className="form-group">
				<label htmlFor="county">County</label>
				<input onChange={ handleOnChange } value={ input.county } type="text" name="county" className="form-control wd-checkout-input" id="county"/>
			</div>
			{/* Post Code */}
			<div className="form-group">
				<label htmlFor="post-code">
					Town/City
					<abbr className="required" title="required">*</abbr>
				</label>
				<input onChange={ handleOnChange } value={ input.postCode } type="text" name="postCode" className="form-control wd-checkout-input" id="post-code"/>
			</div>
			{/*Phone & Email*/}
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="form-group">
						<label htmlFor="phone">
							Phone
							<abbr className="required" title="required">*</abbr>
						</label>
						<input onChange={ handleOnChange } value={ input.phone } type="text" name="phone" className="form-control wd-checkout-input" id="phone"/>
					</div>
				</div>
				<div className="col-lg-6 col-sm-12">
					<div className="form-group">
						<label htmlFor="email">
							Email
							<abbr className="required" title="required">*</abbr>
						</label>
						<input onChange={ handleOnChange } value={ input.email } type="email" name="email" className="form-control wd-checkout-input" id="email"/>
					</div>
				</div>
			</div>
			{/*	Create an Account */}
			<div className="form-check">
				<label className="form-check-label">
					<input onChange={ handleOnChange } className="form-check-input" name="createAccount" type="checkbox"/>
						Create an account?
				</label>
			</div>
			<h2 className="mt-4 mb-4">Additional Information</h2>
			{/* Order Notes */}
			<div className="form-group">
				<label htmlFor="order-notes">Order Notes</label>
				<textarea onChange={ handleOnChange } defaultValue={ input.orderNotes } name="orderNotes" className="form-control wd-checkout-textarea" id="order-notes" rows="4"/>
			</div>
		</React.Fragment>
	);
};

export default Billing;
